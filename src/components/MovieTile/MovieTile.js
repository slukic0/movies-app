import React, { Component } from 'react';
import axios from 'axios'
import noPoster from '../../images/noPoster.png'
import './MovieTile.css'
import {withAuth0 } from "@auth0/auth0-react";
import { Col, Row, Image, Button, Container } from 'react-bootstrap';

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

                    if (boolFav !== this.state.isFav)
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

                    if (boolFav !== prevState.isFav){
                        this.setState({
                            isFav: boolFav
                        })
                    }
                }) 
        }
    }

    render() {
        const { isAuthenticated } = this.props.auth0
        const movie_url = 'https:/www.themoviedb.org/movie/' + this.props.movie.id
        const title = this.props.movie.title 
        let poster_url, myText, myVar

        if (this.props.movie.poster_path == null){
            poster_url= noPoster
        }
        else{
            poster_url = 'https://image.tmdb.org/t/p/'+POSTER_SIZE + this.props.movie.poster_path
        }

        if (!this.state.isFav){
            myText = 'Favourite'
            myVar = 'primary'
        }
        else{
            myText= 'Unfavourite'
            myVar = 'secondary'
        }
        return(
            <div class='tile'>
                <Row>
                    <Image src={poster_url} fluid />
                </Row>
                <Row id='text'>
                    <Container>
                        <h5 class="text-center">{title}</h5>
                    </Container>
                </Row>
                <Row id='buttons'>
                    <Col>
                        <div className="d-grid gap-2">
                            <Button variant="primary" onClick={ () => {window.open(movie_url, '_blank')} }>View</Button>
                        </div>
                    </Col>
                    <Col>
                        <div className="d-grid gap-2">
                            <Button variant={myVar} onClick={this.onClickHandler} disabled={!isAuthenticated}>{myText}</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withAuth0(MovieTile)