import React, { Component } from "react";
import MovieTile from "../MovieTile/MovieTile";
import { Row, Col } from 'react-bootstrap';
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";

class Grid extends Component{
    constructor(props){
        super(props)
        this.state=({
            movies: [],
        })
    }

    getFavs = async() => {
        const {user, isAuthenticated} = this.props.auth0

        if (isAuthenticated){
            const userID = user.sub
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/get/${userID}`)
            return res.data.fav_movies
        }
        else{
            return []
        }
    }

    componentDidMount = async() => {
        const favs = await this.getFavs()
        let myMovies = []

        this.props.movies.forEach(element => {
            const isFav = favs.includes(element.id)
            const tile = <MovieTile movie={element} isFav={isFav}/>
            myMovies.push(<Col key={element.id}>{tile}</Col>)
        });
        this.setState({movies: myMovies})
    }

    render() {
        console.log('grid this.props.movies');
        console.log(this.props.movies);
        console.log('grid movies');
        console.log(this.state.movies);
        return(
            <div className='container-lg'>
                <Row lg={4} md={3} sm={2} xs={1}>
                    {this.state.movies}
                </Row>
            </div>
        );
    }
}

export default withAuth0(Grid)