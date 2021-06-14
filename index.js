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

app.get('/hello/:id', (req, res) => {
    res.send({status:200, message:'Hello,' + req.params.id})
  })

  app.get('/hello/', (req, res) => {
    res.send({status:200, message:'Hello, User'})
  })

  app.get('/search', (req, res) => {
      const data = req.query.search;
    if (data)
    res.send({
        status:200, 
        message:"ok",
        data: data, 
        });
    else 
    res.status(500).send({
        status:500,
        error:true, 
        message:"you have to provide a search", 
        });

  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})