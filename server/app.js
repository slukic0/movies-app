const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');
require('dotenv').config()

const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017' //connect to DB or use local DB
const PORT = process.env.PORT || 4000;

const movies = require('./routes/movies')
const users = require('./routes/users')

app.use('/api/movies', movies)
app.use('/api/users', users)

app.get('/', (req,res) => {
    res.status(200).send('API running');
})

mongoose.connect(`${MONGODB_URI}/movies`, { useNewUrlParser: true, useUnifiedTopology:true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
    (MONGODB_URI==='mongodb://127.0.0.1:27017') ? console.log('Connecting to local MongoDB database...') : console.log('Connecting to MongoDB Atlas database...')
});