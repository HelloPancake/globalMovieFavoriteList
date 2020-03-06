const fetch = require('node-fetch')

API_KEY = "27ff1197"
API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&t=`

const fetchMovies = async(movieTitle) => {
    let movieData = await fetch(API_URL + movieTitle)
    movieData = await movieData.json()
    let movieObject = {title: movieData.Title, year: movieData.Year, plot: movieData.Plot,
                genre: movieData.Genre}
    return movieObject
}

module.exports = fetchMovies