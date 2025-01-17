const express = require('express')
const app = express()
const port = 3000
const datetime = new Date();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('OK!')
})

app.get('/test', (req, res) => {
    res.send({status:200, message:"ok"})
  })

app.get('/movies/update', (req, res) => {  
})

app.get('/movies/delete', (req, res) => {  
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

app.post('/movies/create', (req, res) => {  
    
  })

app.get('/movies/read/', (req, res) => {  
    res.send({status:200, data:movies })
})

app.get('/movies/read/by-date', (req, res) => {
    var sorted_year = movies.sort(function(a,b){
        var keyA = new Date(a.year),
            keyB = new Date(b.year);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
        });
    const response = {
        status:200, data: sorted_year
    };
    res.send(response);
})


app.get('/movies/read/by-rating', (req, res) => {
    var sorted_rate = movies.sort(function(a,b){
        var keyA = new Date(a.rating),
            keyB = new Date(b.rating);
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
        });
    const response = {
        status:200, data: sorted_rate
    };
    res.send(response);
})

app.get('/movies/read/by-title', (req, res) => {
    var sorted_title = movies.sort(function(a,b){
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
        });
    const response = {
        status:200, data: sorted_title
    };
    res.send(response);
})


app.get('/movies/read/id/:id', (req, res) => {
    if (movies[req.params.id]==null){
        const response= {
        
            status:404, error:true, message:'the movie '+req.params.id+' does not exist'}

        res.status(404);
        res.send(response);
    }else{
    const response= {
        
        status:200, data:movies[req.params.id]}
    res.send(response);
    }
})

app.get('/movies/read/id/', (req, res) => {
    const response= {
        
        status:404, error:true, message:'please enter an id to search for you movie'
    };
    res.status(404);
    res.send(response);
})



app.post('/movies/add', (req, res) => {
    let title=req.body.title;
    let year=req.body.year;
    let rating=req.body.rating;
    if (title==false || (year==false || isNaN(year)==true || year.length!=4)){
        res.send({status: 403,error: true,message: "you cannot create a movie without providing a title and a year"});

    } else if (rating==false){
        year=parseInt(year)
        rating=4;
        movies.push({title,year,rating})
        res.send({ status: 200, message:"Added Movie: "+title });
        console.log(rating);
        
    } else {
        year=parseInt(year)
        rating=parseFloat(rating)
        movies.push({title,year,rating})
        res.send({ status: 200, message:"Added Movie: "+title});
    }
});


app.delete('/movies/delete/id/:id', (req, res) => {
    const id = req.params.id;

    if (movies[id]==null){

        const response= {
            status:404, 
            error:true, 
            message:'the movie '+id+' does not exist'
        }

        res.status(404);
        res.json(response);
    }else{
    
    movies.splice(id, 1);
    
    const response = {    
        status:200, 
        data: movies
    }

    res.status(200).json(response);
    }
})

app.delete('/movies/delete/id/', (req, res) => {

    const response= {
        status: 404, 
        error: true, 
        message: 'please enter an id to search for you movie'
    };

    res.status(404);
    res.send(response);
})

app.put('/movies/update/:id', (req, res) => {
    const id = req.params.id;
    const title=req.body.title;
    const year=req.body.year;
    const rating=req.body.rating;

    if (movies[id]==null){

        const response= {
            status:404, 
            error:true, 
            message:'the movie '+id+' does not exist'
        }

        res.status(404);
        res.json(response);
    } else if (rating === undefined && title === undefined && year ===undefined) {
        
        const response= {
            status:404, 
            error:true, 
            message:'Please enter the minimum request'
        }

        res.status(404);
        res.json(response);
    }

    else {

        if (rating !== undefined) {
            movies[id].rating=parseFloat(rating);
        };
        if (title !== undefined) {
            movies[id].title=title;
        };
        if (year !== undefined) {
            movies[id].year=parseInt(year);
        };
        const response = {    
            status:200, 
            data: movies
        }
    
        res.status(200).json(response);
    } 
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})