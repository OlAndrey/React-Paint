const broadcastConnection = (aWss, ws, rooms) => {
  aWss.clients.forEach((client) => {
    if (client.room === ws.room && client.id !== ws.id) {
      const obj = {
        type: 'info-connect',
        params: { userName: ws.name, clients: rooms[ws['room']].length }
      }
      client.send(JSON.stringify(obj))
    }
  })
}

module.exports = broadcastConnection
