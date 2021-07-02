import React, { Component } from 'react';
import axios from 'axios'
import noPoster from '../../images/noPoster.png'
import './MovieTile.css'
import FavButton from './FavButton'

const POSTER_SIZE = 'w500/'

class MovieTile extends Component{

    favHandler = (event) => {
        /*
        1. Check if the user exists in the DB
            i. If not, create the user in the DB
        2. Add the movie to the user's favourites
        
        Backlog: The Fav button should be allow the user to unFav a movie if they have already faved it
        */
        const newUser = {
            //_id: we need the user's auth0 id here,
            fav_movies: []
        };

        axios.post(`http://localhost:4000/users/create/${this.props}`, newUser)
            .then(res => console.log(res.data));

        axios.post(`http://localhost:4000/users/addMovie/${this.props}`, newUser)
            .then(res => console.log(res.data));
    }

    render() {
        console.log(this.favHandler)
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

export default MovieTile