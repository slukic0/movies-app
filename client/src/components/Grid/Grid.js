import React, { Component } from "react";
import MovieTile from "../MovieTile/MovieTile";
import { Row, Col, } from 'react-bootstrap';
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import Spinner from '../Spinner/Spinner'

class Grid extends Component{
    constructor(props){
        super(props)
        this.state=({
            movies: [],
            favs: []
        })
    }

    getFavs = async() => {
        const {user, isAuthenticated} = this.props.auth0

        if (isAuthenticated){
            const userID = user.sub
            const res = await axios.get(`/users/get/${userID}`)
            return res.data.fav_movies
        }
        else{
            return []
        }
    }

    getMovies = () => {
        let myMovies = []
        this.props.movies.forEach(element => {
            const isFav = this.state.favs.includes(element.id)
            const tile = <MovieTile movie={element} isFav={isFav}/>
            myMovies.push(<Col key={element.id}>{tile}</Col>)
        });
        return myMovies

    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.movies !== prevProps.movies){
            this.setState({movies: this.getMovies()})
        }
    }

    componentDidMount = async() => {
        this.setState({favs: await this.getFavs()}, () => {
            this.setState({movies: this.getMovies()})
        })
        
    }

    render() {
        if (!this.state.movies){
            return <Spinner />
        }
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