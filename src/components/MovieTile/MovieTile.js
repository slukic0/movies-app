import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import noPoster from '../../images/noPoster.png'
import './MovieTile.css'

const POSTER_SIZE = 'w500/'

class MovieTile extends Component{

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
                    <a href={movie_url} class="btn btn-primary" target='_blank' rel="noopener noreferrer">View</a>
                </div>
            </div>
        )
    }
}

export default MovieTile