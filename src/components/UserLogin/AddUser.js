import { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";

class AddUser extends Component{

    constructor(props){
        super(props)
        this.state={
            loading: false,
            done: false
        }
    }

    spinner = () => {
        return(
            <div class='container text-center'>
                <div class="spinner-border text-center" role="status">
                    <span class="sr-only"></span>
                </div>
            </div>
        )
    }

    addUserToDB = () => {
        const { user, isLoading } = this.props.auth0
        
        if(!isLoading && !this.state.done){
            const userID = user.sub

            axios.get(`${process.env.REACT_APP_SERVER_URL}/users/exists/${userID}`)
                .then(res => {
                    if (!res.data){ // user is not in the DB, lets create a new user
                        const newUser = {
                            identifier: userID,
                            fav_movies: []
                        };
                        axios.post(`${process.env.REACT_APP_SERVER_URL}/users/create`, newUser)
                            .then( () => {
                                console.log('added user')
                            })
                    }
                })
                .then( () => {
                    this.setState({done: true})
                })
        }

        return(this.spinner())
    }

    componentDidUpdate = () => {
        const { isLoading } = this.props.auth0

        if (isLoading || (!this.state.done && !this.state.loading) ){
            this.setState({loading: true}, () => {
                (this.addUserToDB())
            })
        }
    }

    render(){       
        if (this.state.done) {
            return(<Redirect to='/'/>);
        }
        else{
            return (this.spinner())
        }
    }
}

export default withAuth0(AddUser)