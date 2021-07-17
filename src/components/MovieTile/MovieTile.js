import React, { Component } from 'react';
import axios from 'axios'
import OverlayButton from '../OverlayButton/OverlayButton'
import noPoster from '../../images/noPoster.png'
import './MovieTile.css'
import { Row, Image, Button, Container } from 'react-bootstrap';
import {withAuth0 } from "@auth0/auth0-react";

const POSTER_SIZE = 'w500/'

class MovieTile extends Component{

    constructor(props){
        super(props)
        this.state={
            isFav: false
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

        axios.post(`${process.env.REACT_APP_SERVER_URL}/users/addMovie/${userID}`, {"movieID": movieID})
            .then(this.setState({isFav: true}))
    }

    removeFromFav = (event) => { 
        const { user } = this.props.auth0
        const userID = user.sub
        const movieID = this.props.movie.id

        axios.post(`${process.env.REACT_APP_SERVER_URL}/users/removeMovie/${userID}`, {"movieID": movieID})
            .then(this.setState({isFav: false}));
    }

    componentDidMount = () => {
        this.setState({isFav: this.props.isFav})
    }

    render() {
        const { isAuthenticated } = this.props.auth0
        const movie_url = 'https:/www.themoviedb.org/movie/' + this.props.movie.id
        const title = this.props.movie.title
        let poster_url, myText, myVar, favButton

        if (this.props.movie.poster_path == null){
            poster_url= noPoster
        }
        else{
            poster_url = 'https://image.tmdb.org/t/p/'+POSTER_SIZE + this.props.movie.poster_path
        }

        if (!this.state.isFav){
            myText = 'Favourite'
            myVar = 'secondary'
        }
        else{
            myText= 'Unfavourite'
            myVar = 'success'
        }

        if (isAuthenticated){
            favButton = (<Button variant={myVar} className='tile-btn' size="sm" onClick={this.onClickHandler} >{myText}</Button>)
        }
        else{
            favButton = (<OverlayButton variant={myVar} className='tile-btn' size="sm" text={myText} tip="Please log in to favourite a movie!"/>)
        }
        return(
            <div className='tile'>
                <Row>
                    <Image src={poster_url} fluid className='tile-img' />
                </Row>
                <Row id='text'>
                    <Container style={{border: '0px'}}>
                        <h5 className="title">{title}</h5>
                    </Container>
                </Row>
                <Row id='viewButton'>
                    <div className="d-grid gap-2">
                        <Button variant="primary" className='tile-btn' size="sm" href={movie_url} target='_blank' rel='noopener noreferrer'>View</Button>
                    </div>
                </Row>
                <Row id='favButton'>
                    <div className="d-grid gap-2">
                        {favButton}
                    </div>
                </Row>
            </div>
        )
    }
}

export default withAuth0(MovieTile)