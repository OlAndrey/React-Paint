const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const broadcastConnection = require('./src/utils/broadcastConnection')
const generalInformation = require('./src/utils/generalInfo')
const notifyLeav = require('./src/utils/notifyLeav')

const maxClients = 5
let rooms = {}
let imgFromRooms = {}

app.use(cors())
app.use(express.json())

app.post('/image', (req, res) => {
  try {
    const roomName = req.query.id
    imgFromRooms[roomName] = req.body.img
    // console.log(req.body)
    // const data = req.body.img.replace(`data:image/png;base64,`, '')
    // fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
    return res.status(200).json({ message: 'Загружено' })
  } catch (e) {
    console.log(e)
    return res.status(500).json('error')
  }
})

app.get('/image', (req, res) => {
  try {
    const roomName = req.query.id
    const data = imgFromRooms[roomName]

    // const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
    // const data = `data:image/png;base64,` + file.toString('base64')
    res.status(200).json({ data })
  } catch (e) {
    console.log(e)
    return res.status(500).json('error')
  }
})

app.ws('/', (ws, res) => {
  ws.on('message', function message(data) {
    const obj = JSON.parse(data)
    const type = obj.type
    const params = obj.params

    switch (type) {
      case 'connect':
        connect(ws, params)
        break

      case 'leave':
        leave(ws, params)
        break

      case 'draw':
        drawHandler(ws, params)
        break

      default:
        console.warn(`Type: ${type} unknown`)
        break
    }
  })
})

function connect(ws, params) {
  const room = params.room
  if (!Object.keys(rooms).includes(room)) rooms[room] = [ws]
  else rooms[room].push(ws)

  if (rooms[room].length >= maxClients) {
    console.warn(`Room ${room} is full!`)
    const obj = {
      type: 'error-connect',
      params: { message: `Room ${room} is full!` }
    }
    return ws.send(JSON.stringify(obj))
  }

  ws['room'] = room
  ws.id = params.id
  ws.name = params.name
  generalInformation(ws, rooms)
  broadcastConnection(aWss, ws, rooms)
}

function leave(ws, params) {
  const room = ws.room
  notifyLeav(aWss, ws, rooms)
  if (Array.isArray(rooms[room])) rooms[room] = rooms[room].filter((so) => so !== ws)
  ws['room'] = undefined

  if (rooms[room].length == 0) close(room)
}

function close(room) {
  const newRooms = {}
  if (imgFromRooms[room]) delete imgFromRooms[room]
  for (const roomName in rooms) {
    if (roomName !== room) {
      newRooms[roomName] = rooms[roomName]
    }
  }

  rooms = newRooms
}

function drawHandler(ws, params) {
  console.log('draw-' + params.func)
  aWss.clients.forEach((client) => {
    if (client.room === ws.room && client.id !== ws.id) {
      const obj = {
        type: 'draw-' + params.func,
        params: { args: params.args }
      }
      client.send(JSON.stringify(obj))
    }
  })
}

app.listen(5000, () => {
  console.log('Server been starting on port 5000...')
})
