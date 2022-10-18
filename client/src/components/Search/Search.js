import React, { Component } from 'react';
import axios from 'axios'
import './Search.css'
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
            noResults: false,
            server: process.env.REACT_APP_SERVER_URL || ''
        }
    }

    preformSearch = (searchTerm, pageNum) =>{
        // https://developers.themoviedb.org/3/

        this.setState({noResults: false})
        this.setState({loading: true})
        const URL = this.state.server+`/api/movies/search/${searchTerm}/${pageNum}`
        
        axios.get(URL)
        .then((response) => {
            this.setState({
                movies: response.data,
                pageNum: this.state.pageNum+1,
                loading: false
            })

            if (response.data.length === 0 && searchTerm !== ""){
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

        const URL = this.state.server+`/api/movies/search/${searchTerm}/${pageNum}`
        
        axios.get(URL)
        .then((response) => {
            response.data.forEach(element => {
                this.state.movies.push(element)
            });
            this.setState({loading: false})

            if (response.data.length === 0 && searchTerm !== ""){
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
        if (this.state.noResults){
            return(
                <div className='container'>
                    <input type="text" className="search" placeholder="Search for a movie" onChange={this.changeHandler}/>
                    <br/>
                    <Grid movies={this.state.movies}/>
                    <div className="alert alert-primary" role="alert">
                        No results found
                    </div>
                </div>  
            )
        }
        else{
            if (this.state.loading || this.state.searchTerm===""){
                return(
                    <div className='container-lg'>
                        <input type="text" className="search" placeholder="Search for a movie" onChange={this.changeHandler}/>
                        <br/>
                        <Grid movies={this.state.movies}/>
                    </div>  
                );
            }
            else{
                return(
                    <div className='container-lg'>
                        <input type="text" className="search" placeholder="Search for a movie" onChange={this.changeHandler}/>
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