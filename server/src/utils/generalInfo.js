const generalInformation = (ws, rooms) => {
  let obj
  if (ws['room'] === undefined)
    obj = {
      type: 'info-room',
      params: {
        room: 'no room'
      }
    }
  else
    obj = {
      type: 'info-room',
      params: {
        room: ws['room'],
        clients: rooms[ws['room']].length
      }
    }

  ws.send(JSON.stringify(obj))
}

module.exports = generalInformation
