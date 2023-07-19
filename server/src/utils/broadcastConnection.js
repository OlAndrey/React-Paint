const broadcastConnection = (aWss, ws) => {
  aWss.clients.forEach((client) => {
    if (client.room === ws.room && client.id !== ws.id) {
      const obj = { type: 'info-connect', params: { userName: ws.name } }
      client.send(JSON.stringify(obj))
    }
  })
}

module.exports = broadcastConnection
