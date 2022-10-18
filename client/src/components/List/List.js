import axios from "axios"
import { Component } from "react"
import { withAuth0 } from "@auth0/auth0-react";
import Grid from '../Grid/Grid'
import Spinner from '../Spinner/Spinner'


class Browse extends Component{

    constructor(props){
        super(props)
        this.state={
            loading: true,
            favMovies: [],
            server: process.env.REACT_APP_SERVER_URL || ''
        }
    }

    getFavMovies = () => {
        const { user } = this.props.auth0
        const userID = user.sub

        axios.get(this.state.server+`/api/users/get/${userID}`)
            .then( (res) =>{
                this.getMovieDetails(res.data.fav_movies)
            })
    }

    getMovieDetails = (movieList) => {
        let movies = []
        let promiseArray = [];

        movieList.forEach(element => {
            promiseArray.push(
                axios.get(this.state.server+`/api/movies/getmovie/${element}`)
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
        const {isAuthenticated} = this.props.auth0

        if (!isAuthenticated){
            return (
              <div className="alert alert-danger" role="alert">
                Please log in to view your favourite movies!
              </div>
            )
        }
        else{
            if (this.state.loading){
                return(<Spinner />)
            }
            else if (this.state.favMovies.length === 0){
                return (
                    <div className="alert alert-primary" role="alert">
                      You have no favourite movies!
                    </div>
                  )
            }
            else{
                return(
                    <div className='container-xl'>
                        <Grid movies={this.state.favMovies} />
                    </div>  
                );
            }
        }
    }
}

export default withAuth0(Browse)