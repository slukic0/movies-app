const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    _id: {
        type: mongoose.ObjectId,
        required: true
    },
    fav_movies: {
        type: [Number]
    }
})

module.exports = mongoose.model('user', user)