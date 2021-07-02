var express = require('express')
var router = express.Router()
const axios = require('axios')
require('dotenv').config()

const mongoose = require('mongoose')
const User = require('../models/User')


router.route('/').get(function(req,res){
    res.status(200).send("Welcome to /users/")
})

router.route('./view/:id').get(function(req,res){
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.status(200).json(user);
    });
})

router.route('./create/:id').post(function(req,res){
    let user = new User(req.body);
    user.save()
        .then( () => {
            res.status(200).send('User added!');
        })
        .catch(err => {
            res.status(400).send('Error: cannot add user!');
        });
})

router.route('.addMovie/:id').post(function(req,res){

})


module.exports = router