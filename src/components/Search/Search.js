import React, { Component } from 'react';
import axios from 'axios'

import './Search.css'
import MovieTile from '../MovieTile/MovieTile';
import Grid from '../Grid/Grid'
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'

class Search extends Component{

    constructor(props){
        super(props)
        this.state={
            movies: [],
            searchTerm: "",
            currentPage: 1,
            loading: false,
            noResults: false
        }
    }

    preformSearch = (searchTerm, pageNum) =>{
        // https://developers.themoviedb.org/3/

        this.setState({noResults: false})
        this.setState({loading: true})
        //const URL = `${API_URL}/search/movie?&api_key=${API_KEY}&query=${searchTerm}&page=${pageNum}`
        const URL = `http://localhost:4000/movies/search/${searchTerm}/${pageNum}`
        
        axios.get(URL)
        .then((response) => {
            let myMovies = []
            response.data.forEach(element => {
                const tile = <MovieTile key={element.id} movie={element} />
                myMovies.push(tile)
            });
            this.setState({movies: myMovies})
            this.setState({loading: false})

            if (this.state.movies.length === 0 && searchTerm !== ""){
                this.setState({noResults: true})
            }
        })
        .catch(err =>{
            console.log(err)
        });
    }

    appendSearch = (searchTerm, pageNum) =>{
        // https://developers.themoviedb.org/3/

        this.setState({noResults: false})
        this.setState({loading: true})

        //const URL = `${API_URL}/search/movie?&api_key=${API_KEY}&query=${searchTerm}&page=${pageNum}`
        const URL = `http://localhost:4000/movies/search/${searchTerm}/${pageNum}`
        
        axios.get(URL)
        .then((response) => {
            response.data.forEach(element => {
                const tile = <MovieTile key={element.id} movie={element} />
                this.state.movies.push(tile)
            });
            this.setState({loading: false})

            if (this.state.movies.length === 0 || searchTerm !== ""){
                this.setState({noResults: true})
            }
        })
        .catch(err =>{
            console.log(err)
        });
    }

    changeHandler = (event) => {
        this.setState({currentPage: 1, searchTerm: event.target.value}, ()=>{
            if(this.state.searchTerm !== ""){
                this.preformSearch(this.state.searchTerm, 1)
            }   
        })
    }

    clickHandler = () =>{
        this.setState({currentPage: this.state.currentPage+1}, () =>{
            this.appendSearch(this.state.searchTerm, this.state.currentPage)
        })
    }

    render() {
        console.log(this.state.searchTerm)
        if (this.state.noResults){
            return(
                <div class='container'>
                    <input type="text" class="search" placeholder="Search for a movie" onChange={this.changeHandler}/>
                    <br/>
                    <Grid movies={this.state.movies}/>
                    <div class="alert alert-primary" role="alert">
                        No results found
                    </div>
                </div>  
            )
        }
        else{
            if (this.state.loading || this.state.searchTerm===""){
                return(
                    <div class='container-xl'>
                        <input type="text" class="search" placeholder="Search for a movie" onChange={this.changeHandler}/>
                        <br/>
                        <Grid movies={this.state.movies}/>
                    </div>  
                );
            }
            else{
                return(
                    <div class='container-xl'>
                        <input type="text" class="search" placeholder="Search for a movie" onChange={this.changeHandler}/>
                        <br/>
                        <Grid movies={this.state.movies}/>
                        <LoadMoreBtn text='Load More' onClick={this.clickHandler}/>
                    </div>  
                );
            }
        }  
    }
}

export default Search