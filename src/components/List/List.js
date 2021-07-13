import axios from "axios"
import { Component } from "react"
import { withAuth0 } from "@auth0/auth0-react";
import Grid from '../Grid/Grid'


class Browse extends Component{

    constructor(props){
        super(props)
        this.state={
            loading: true,
            favMovies: []
        }
    }

    getFavMovies = () => {
        const { user } = this.props.auth0
        const userID = user.sub

        axios.get(`${process.env.REACT_APP_SERVER_URL}/users/get/${userID}`)
            .then( (res) =>{
                this.getMovieDetails(res.data.fav_movies)
            })
    }

    getMovieDetails = (movieList) => {
        let movies = []
        let promiseArray = [];

        movieList.forEach(element => {
            promiseArray.push(
                axios.get(`${process.env.REACT_APP_SERVER_URL}/movies/getmovie/${element}`)
                    .then(res =>{
                        movies.push(res.data)
                    })
            )
        });

        Promise.all(promiseArray)
            .then( () =>{
                this.setState({
                    favMovies: movies,
                    loading: false
                })
            })
    }

    componentDidMount = () =>{
        const {isAuthenticated} = this.props.auth0
        if(isAuthenticated){
            this.getFavMovies()
        }
    }

    render() {
        console.log('render');
        const {isAuthenticated} = this.props.auth0

        if (!isAuthenticated){
            return (
              <div class="alert alert-danger" role="alert">
                Please log in to view your favourite movies!
              </div>
            )
        }
        else{
            if (this.state.loading){
                return(
                    <div class='container text-center'>
                        <div class="spinner-border text-center" role="status">
                            <span class="sr-only"></span>
                        </div>
                    </div>
                )
            }
            else if (this.state.favMovies.length === 0){
                return (
                    <div class="alert alert-primary" role="alert">
                      You have no favourite movies!
                    </div>
                  )
            }
            else{
                console.log(this.state.favMovies);
                return(
                    <div class='container-xl'>
                        <Grid movies={this.state.favMovies} />
                    </div>  
                );
            }
        }
    }
}

export default withAuth0(Browse)