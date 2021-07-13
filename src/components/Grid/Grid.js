import React, { Component } from "react";
import MovieTile from "../MovieTile/MovieTile";

class Grid extends Component{

    getMovieGrid = () => {
        const rowLength = 4
        const myClass = 'row row-cols-'+rowLength

        let movies = []
        let nRows = this.props.movies.length
        let rows = []

        this.props.movies.forEach(element => {
            const tile = <MovieTile key={element.id} movie={element} />
            movies.push(tile)
        });
        
        for (let i = 0; i < nRows*rowLength; i+=rowLength) {
            
            let row = []

            for (let j = 0; j < rowLength; j++) {
                row.push(movies[j+i])
            }

            rows.push(<div key={i}class={myClass}>{row}<br/></div>)
        }
        return(rows);
    }

    render() {
        return(
            <div class='container-lg'>
                {this.getMovieGrid()}
            </div>
        );
    }
}

export default Grid