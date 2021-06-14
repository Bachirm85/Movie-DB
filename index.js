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



const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

app.get('/movies/create', (req, res) => {  
    
  })

app.get('/movies/read', (req, res) => {  
    res.send({status:200, data:movies })
})

app.get('/movies/update', (req, res) => {  
})

app.get('/movies/delete', (req, res) => {  
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})