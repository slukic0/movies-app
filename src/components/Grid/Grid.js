import React, { Component } from "react";
import MovieTile from "../MovieTile/MovieTile";
import { Row, Col } from 'react-bootstrap';

class Grid extends Component{
    getMovieGrid = () => {
        let movies = []
        this.props.movies.forEach(element => {
            const tile = <MovieTile movie={element} />
            movies.push(<Col>{tile}</Col>)
        });
        return(movies);
    }

    render() {
        return(
            <div class='container-lg'>
                <Row lg={4} md={3} sm={2} xs={1}>
                    {this.getMovieGrid()}
                </Row>
            </div>
        );
    }
}

export default Grid