import { Component } from "react";
import axios from 'axios'
import OverlayButton from '../OverlayButton/OverlayButton'
import { Button } from 'react-bootstrap';
import { withAuth0 } from "@auth0/auth0-react";

class FavButton extends Component{

    constructor(props){
        super(props)
        this.state={
            isFav: false,
            server: process.env.REACT_APP_SERVER_URL || ''
        }
    }

    componentDidMount = () =>{
        this.setState({
            ID: this.props.id,
            isFav: this.props.isFav
        })
    }

    favHandler = () => {
        if (!this.state.isFav){
            this.addToFav()
        }
        else{
            this.removeFromFav()
        }
    }

    addToFav = (event) => { 
        const { user } = this.props.auth0
        const userID = user.sub
        const movieID = this.props.id

        axios.post(this.state.server+`/users/addMovie/${userID}`, {"movieID": movieID})
            .then(this.setState({isFav: true}));
    }

    removeFromFav = (event) => { 
        const { user } = this.props.auth0
        const userID = user.sub
        const movieID = this.props.id

        axios.post(this.state.server+`/users/removeMovie/${userID}`, {"movieID": movieID})
            .then(this.setState({isFav: false}));
    }

    
    render = () => {
        const { isAuthenticated } = this.props.auth0
        let myVar, myText

        if (!this.state.isFav){
            myText = 'Favourite'
            myVar = 'secondary'
        }
        else{
            myText= 'Unfavourite'
            myVar = 'success'
        }
        
        if (isAuthenticated){
            return(
                <Button variant={myVar} className='tile-btn' size="sm" onClick={this.favHandler} >{myText}</Button>
            )
        }
        else{
            return(
                <OverlayButton variant={myVar} className='tile-btn' size="sm" text={myText} tip="Please log in to favourite a movie!"/>
            )
        }
    }
}

export default withAuth0(FavButton)