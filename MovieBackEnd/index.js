const express = require('express')
const app = express()
const port = 3001
const Movie = require('./models/movie')
const connect = require('./util/connect')
const fetchMovies = require('./util/fetchMovies')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/search', async (req, res) => {
    movie = req.body.searchTitle
    movieObject = await fetchMovies(movie)

    res.status(200).json({message: 'movie created',
                          searchedMovie: movieObject})
})

app.post('/favorite', async(req, res) => {
    movie = req.body
  
    let movieExists = await Movie.findOne({title: movie.title})

    if (movieExists){
        res.status(500).json({message: "movie already favorited",
                                favorites: await Movie.find() })
    }
    else{

        newMovie = new Movie(movie)
        try {
            await newMovie.save()
        }
        catch (err) {
            console.log('couldnt create movie')
            res.status(500).json({ message: err.message,
                            favorites: await Movie.find() })
        }
    
        res.status(200).json({
            message: 'movie created',
            favorites: await Movie.find()
        })
    }
})

app.get('/favorites', async(req, res) => {
    movies = await Movie.find()
    res.status(200).json( {message:"all good",
               movies: movies})
})

app.delete('/favorites', async(req, res) => {
    try{
        await Movie.deleteOne({title: req.body.title})
        res.status(200).json({message: 'movie deleted',
                            favorites: await Movie.find()})
    }
    catch (err) {
        console.log('couldnt delete the movie')
        res.status(500).json({ message: err.message })
    }

})

const initialize = async () => {
    await connect()
    await Movie.collection.drop()
    await Movie.create({ title: "hello", year: 5, plot: "hello", genre: "hello" })
}

initialize()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))