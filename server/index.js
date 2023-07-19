const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const broadcastConnection = require('./src/utils/broadcastConnection')
const generalInformation = require('./src/utils/generalInfo')

const maxClients = 5
let rooms = {}

app.ws('/', (ws, res) => {
  ws.send('Connected!', ws.name)
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
    return ws.send(`Room ${room} is full!`)
  }

  ws['room'] = room
  ws.id = params.id
  ws.name = params.name
  generalInformation(ws, rooms)
  broadcastConnection(aWss, ws)
}

function leave(ws, params) {
  const room = ws.room
  console.log(room, rooms)
  rooms[room] = rooms[room].filter((so) => so !== ws)
  ws['room'] = undefined

  if (rooms[room].length == 0) close(room)
  ws.send(`You leave in room ${room}`)
}

function close(room) {
  const newRooms = {}
  for (const roomName in rooms) {
    if (roomName !== room) {
      newRooms[roomName] = rooms[roomName]
      console.log(roomName)
    }
  }

  rooms = newRooms
}

app.listen(5000, () => {
  console.log('Server been starting on port 5000...')
})
