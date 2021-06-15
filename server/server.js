const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors())
const PORT = 4000;

const movies = require('./routes/movies')

app.get('/', function(req, res){
   res.send("Welcome to /");
});

app.use('/movies', movies)

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});