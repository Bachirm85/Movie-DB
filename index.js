const express = require('express')
const app = express()
const port = 3000
const datetime = new Date();

app.get('/', (req, res) => {
  res.send('OK!')
})

app.get('/test', (req, res) => {
    res.send({status:200, message:"ok"})
  })

app.get('/time', (req, res) => {
    res.send({status:200, message:datetime.getHours()+ ":" + datetime.getMinutes()})
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})