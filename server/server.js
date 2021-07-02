const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors())
const PORT = 4000;

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true, useUnifiedTopology:true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

const movies = require('./routes/movies')
const users = require('./routes/users')

app.use('/movies', movies)
app.use('/users', users)

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});