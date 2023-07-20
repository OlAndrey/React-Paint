const notifyLeav = (aWss, ws, rooms) => {
    aWss.clients.forEach((client) => {
      if (client.room === ws.room && client.id !== ws.id) {
        const obj = {
          type: 'info-leave',
          params: { userName: ws.name, clients: rooms[ws['room']].length - 1 }
        }
        client.send(JSON.stringify(obj))
      }
    })
  }
  
  module.exports = notifyLeav
  