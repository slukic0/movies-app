var express = require('express')
var router = express.Router()
const axios = require('axios')
require('dotenv').config()

const mongoose = require('mongoose')
const User = require('../models/User')
mongoose.set('useFindAndModify', false);

/**
 * View DB
 */
router.route('/').get(function(req,res){
    User.find(function(err, users) {
        if (err) {
            console.log(err);
            res.status(500).send('Error: cannot add user!');

        } else {
            res.json(users);
        }
    });
})

/**
 * Get a user
 */
router.route('/get/:userID').get(function(req,res){
    const userID = req.params.userID;
    User.findOne( { identifier: userID }, function(err, user) {
        res.status(200).json(user);
    });
})

/**
 * Check if a user exists
 */
router.route("/exists/:userID").get(function(req, res) {
    const userID = req.params.userID;
    User.exists({ identifier: userID }, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send(result);
      }
    });
});

/**
* Create a new user
*/
router.route('/create').post(function(req,res){
    const user = new User({
        identifier: req.body.identifier,
        fav_movies: req.body.fav_movies
    });

    console.log(user)
    user.save()
        .then( () => {
            res.status(200).send('User added!');
        })
        .catch(err => {
            res.status(400).send('Error: cannot add user!');
        });
})

/**
 * Delete a user
 */
 router.route('/delete/:userID').get(function(req,res){
    const userID = req.params.userID;

    User.deleteOne( { identifier: userID } )
        .then( () => {
            res.status(200).send('User deleted!');
        })
        .catch(err => {
            res.status(400).send('Error: cannot delete user!');
        });
})

/**
 * Add a movie to the user's favourites
 */
router.route('/addMovie/:userID').post(function(req,res){
    const userID = req.params.userID;
    const newMovie = req.body.movieID

    User.findOneAndUpdate(
        {identifier: userID},
        { $push: { fav_movies: newMovie } },
        function (error, success) {
            if (error) {
                res.status(400).send('Error: cannot add movie!');
            }
            else {
                res.status(200).send('Movie added!');
            }
        }
    )
})

/**
 * Remove a movie from the user's favourites
 */
 router.route('/removeMovie/:userID').post(function(req,res){
    const userID = req.params.userID;
    const newMovie = req.body.movieID

    User.findOneAndUpdate(
        {identifier: userID},
        { $pull: { fav_movies: newMovie } },
        function (error, success) {
            if (error) {
                res.status(400).send('Error: cannot remove movie!');
            }
            else {
                res.status(200).send('Movie removed!');
            }
        }
    )
})

module.exports = router