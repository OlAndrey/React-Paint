const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const broadcastConnection = require('./src/utils/broadcastConnection')
const generalInformation = require('./src/utils/generalInfo')
const notifyLeav = require('./src/utils/notifyLeav')

const maxClients = 5
let rooms = {}

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
      params: { error: `Room ${room} is full!` }
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
  rooms[room] = rooms[room].filter((so) => so !== ws)
  ws['room'] = undefined

  if (rooms[room].length == 0) close(room)
}

function close(room) {
  const newRooms = {}
  for (const roomName in rooms) {
    if (roomName !== room) {
      newRooms[roomName] = rooms[roomName]
    }
  }

  rooms = newRooms
}

app.listen(5000, () => {
  console.log('Server been starting on port 5000...')
})
