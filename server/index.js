const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()

app.listen(5000, () => {
  console.log('Server been starting on port 5000...')
})
