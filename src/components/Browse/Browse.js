import React, { Component } from 'react';
import axios from 'axios'

import MovieTile from '../MovieTile/MovieTile';
import Grid from '../Grid/Grid'
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_API_KEY;

class Browse extends Component{

    constructor(props){
        super(props)
        this.state={
            loading: true,
            movies: [],
            pageNum: 1
        }
    }

    getPopular = () =>{
        // https://developers.themoviedb.org/3/
        const URL = `${API_URL}/movie/popular?&api_key=${API_KEY}&page=${this.state.pageNum}`
        
        axios.get(URL)
        .then((response) => {
            response.data.results.forEach(element => {
                const tile = <MovieTile key={element.id} movie={element} />
                this.state.movies.push(tile)
            });
            this.setState({loading: false})
            this.setState({pageNum: this.state.pageNum+1})
        })
        .catch(err =>{
            console.log(err)
        });
    }

    componentDidMount() {
        this.getPopular()
    }

    render() {
        if (this.state.loading){
            return(
                <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                </div>
            )
        }
        else{
            return(
                <div>
                    <Grid movies={this.state.movies}/>
                    <LoadMoreBtn text='Load More' onClick={this.getPopular}/>
                </div>
            );
        } 
    }
}

export default Browse