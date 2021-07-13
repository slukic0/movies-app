const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    identifier: {
        type: String,
        required: true
    },
    fav_movies: {
        type: [Number]
    }
})

module.exports = mongoose.model('user', user)