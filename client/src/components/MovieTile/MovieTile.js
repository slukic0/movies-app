import React, { Component } from 'react';
import noPoster from '../../images/noPoster.png'
import './MovieTile.css'
import { Row, Image, Container } from 'react-bootstrap';
import {withAuth0 } from "@auth0/auth0-react";
import { withRouter } from 'react-router-dom';
import FavButton from '../FavButton/FavButton';

const POSTER_SIZE = 'w500/'

class MovieTile extends Component{

    constructor(props){
        super(props)
        this.state={
            loaded: false,
            server: process.env.REACT_APP_SERVER_URL || ''
        }
    }

    redirectHandler = () => {
        let path = '/movie/'+this.props.movie.id
        let history = this.props.history
        history.push(path)
    }

    render() {
        const title = this.props.movie.title
        let poster_url
        (this.props.movie.poster_path == null) ? poster_url= noPoster : poster_url = 'https://image.tmdb.org/t/p/'+POSTER_SIZE + this.props.movie.poster_path

        return(
            <div className='tile' style={this.state.loaded ? {} : {display: 'none'}}>
                <div onClick={()=>{this.redirectHandler()}} >
                    <Row id='img'>
                        <Image 
                            src={poster_url} 
                            fluid className='tile-img' 
                            onLoad={() => this.setState({loaded: true})}
                        />
                    </Row>
                    <Row id='text'>
                        <Container style={{border: '0px'}}>
                            <h5 className="title">{title}</h5>
                        </Container>
                    </Row>  
                </div>
                <Row id='favButton'>
                    <div className="d-grid gap-2">
                        {<FavButton isFav={this.props.isFav} id={this.props.movie.id}/>}
                    </div>
                </Row>
            </div>
        )
    }
}

export default withRouter(withAuth0(MovieTile))