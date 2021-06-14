import React, { Component } from "react";

class Grid extends Component{

    getMovieGrid = () => {
        const rowLength = 4
        const myClass = 'row row-cols-'+rowLength

        let nRows = this.props.movies.length
        let rows = []
        
        for (let i = 0; i < nRows*rowLength; i+=rowLength) {
            
            let row = []

            for (let j = 0; j < rowLength; j++) {
                row.push(this.props.movies[j+i])
            }

            rows.push(<div key={i}class={myClass}>{row}<br/></div>)
        }
        return(rows);
    }

    render() {
        return(
            <div class='container'>
                {this.getMovieGrid()}
            </div>
        );
    }
}

export default Grid