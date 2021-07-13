import React, { Component } from 'react';
import axios from 'axios'
import noPoster from '../../images/noPoster.png'
import './MovieTile.css'
import FavButton from './FavButton'
import {withAuth0 } from "@auth0/auth0-react";

const POSTER_SIZE = 'w500/'

class MovieTile extends Component{

    favHandler = (event) => { 
        console.log("fav handler is running")
        const { user } = this.props.auth0
        const userID = user.sub
        const movieID = this.props.movie.id
        const newUser = {
            identifier: userID,
            fav_movies: []
        };

        axios.get(`${process.env.REACT_APP_SERVER_URL}/users/exists/${userID}`)
            .then(res => {
                if (!res.data){ // user is not in the DB, lets create a new user
                    axios.post(`${process.env.REACT_APP_SERVER_URL}/users/create`, newUser)
                        .then(console.log(res));
                }
            })
            // now lets add the movie to the user's favs
            .then(res =>{
                axios.post(`${process.env.REACT_APP_SERVER_URL}/users/addMovie/${userID}`, {"movieID": movieID})
                    .then(console.log(res));
            });
    }

    render() {
        const movie_url = 'https:/www.themoviedb.org/movie/' + this.props.movie.id
        const title = this.props.movie.title 

        let poster_url = 'https://image.tmdb.org/t/p/'+POSTER_SIZE + this.props.movie.poster_path

        if (this.props.movie.poster_path == null){
            poster_url= noPoster
        }

        return(
            <div class="card text-center">
                <img class="card-img-top" src={poster_url} alt='Movie Poster' onError={this.errorHandler}/>
                <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <div class='row'>
                        <div class='col w-50'>
                            <a href={movie_url} class="btn btn-primary" target='_blank' rel="noopener noreferrer">View</a>
                        </div>
                        <div class='col w-50'>
                            <FavButton onClick={this.favHandler} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withAuth0(MovieTile)