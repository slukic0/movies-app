var express = require('express')
var router = express.Router()
const axios = require('axios')
require('dotenv').config()

/* API Documentation https://developers.themoviedb.org/3/ */
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.API_KEY;


router.route('/').get(function(req,res){
    res.send("Welcome to /movies/")
})

router.route('/getpopular/:pageNum').get(function(req,res){
    const URL = `${API_URL}/movie/popular?&api_key=${API_KEY}&page=${req.params.pageNum}`
    
    axios.get(URL)
    .then((response) => {
        res.json(response.data.results)
    })
    .catch(err =>{
        console.log(err)
    });
})

router.route('/search/:query/:pageNum').get(function(req,res){
    const URL = `${API_URL}/search/movie?&api_key=${API_KEY}&query=${req.params.query}&page=${req.params.pageNum}`
    
    axios.get(URL)
    .then((response) => {
        res.json(response.data.results)
    })
    .catch(err =>{
        console.log(err)
    });
})

router.route('/getmovie/:id').get(function(req,res){
    const URL = `${API_URL}/movie/${req.params.id}?api_key=${API_KEY}`
    console.log(URL)

    axios.get(URL)
    .then((response) => {
        res.json(response.data)
    })
    .catch(err =>{
        console.log(err)
    });

})

module.exports = router