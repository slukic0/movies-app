import React, { Component } from 'react';
import axios from 'axios'
import noPoster from '../../images/noPoster.png'
import './MovieTile.css'
import {withAuth0 } from "@auth0/auth0-react";

const POSTER_SIZE = 'w500/'

class MovieTile extends Component{

    constructor(props){
        super(props)
        
        this.state={
            isFav: false,
        }
    }

    onClickHandler = () => {
        if (!this.state.isFav){
            return this.addToFav()
        }
        else{
            return this.removeFromFav()
        }
    }

    addToFav = (event) => { 
        const { user } = this.props.auth0
        const userID = user.sub
        const movieID = this.props.movie.id

        axios.get(`${process.env.REACT_APP_SERVER_URL}/users/exists/${userID}`)
            .then(res => {
                if (!res.data){ // user is not in the DB, lets create a new user
                    const newUser = {
                        identifier: userID,
                        fav_movies: []
                    };
                    axios.post(`${process.env.REACT_APP_SERVER_URL}/users/create`, newUser)
                        .then( (res) => console.log(res));
                }
            })
            // now lets add the movie to the user's favs
            .then(res =>{
                axios.post(`${process.env.REACT_APP_SERVER_URL}/users/addMovie/${userID}`, {"movieID": movieID})
                    .then( (res) => console.log(res))
                    .then(this.setState({isFav: true}))
            });
    }

    removeFromFav = (event) => { 
        const { user } = this.props.auth0
        const userID = user.sub
        const movieID = this.props.movie.id

        axios.post(`${process.env.REACT_APP_SERVER_URL}/users/removeMovie/${userID}`, {"movieID": movieID})
            .then( (res) => console.log(res))
            .then(this.setState({isFav: false}))
    }

    componentDidMount = () => {
        const { user, isAuthenticated } = this.props.auth0

        if (isAuthenticated){
            const userID = user.sub
            const movieID = this.props.movie.id
            let boolFav

            axios.get(`${process.env.REACT_APP_SERVER_URL}/users/get/${userID}`)
                .then( (res) =>{
                    boolFav = res.data.fav_movies.includes(movieID)

                    if (boolFav != this.state.isFav)
                    this.setState({
                        isFav: boolFav
                    })
                }) 
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { user, isAuthenticated } = this.props.auth0

        if (isAuthenticated){
            const userID = user.sub
            const movieID = this.props.movie.id
            let boolFav

            axios.get(`${process.env.REACT_APP_SERVER_URL}/users/get/${userID}`)
                .then( (res) =>{
                    boolFav = res.data.fav_movies.includes(movieID)

                    if (boolFav != prevState.isFav){
                        this.setState({
                            isFav: boolFav
                        })
                    }
                }) 
        }
    }

    render() {
        console.log('render');
        const { isAuthenticated } = this.props.auth0
        const movie_url = 'https:/www.themoviedb.org/movie/' + this.props.movie.id
        const title = this.props.movie.title 
        let poster_url, myText, myClass

        if (this.props.movie.poster_path == null){
            poster_url= noPoster
        }
        else{
            poster_url = 'https://image.tmdb.org/t/p/'+POSTER_SIZE + this.props.movie.poster_path
        }

        if (!this.state.isFav){
            myText = 'Favourite'
            myClass = 'btn btn-primary'
        }
        else{
            myText= 'Unfavourite'
            myClass = 'btn btn-secondary'
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
                            <button onClick={this.onClickHandler} class={myClass} type='button' disabled={!isAuthenticated}>{myText}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withAuth0(MovieTile)