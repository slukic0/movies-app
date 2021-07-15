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
            console.log('checking if user in DB')
            const userID = user.sub

            axios.get(`${process.env.REACT_APP_SERVER_URL}/users/exists/${userID}`)
                .then(res => {
                    console.log(res)
                    if (!res.data){ // user is not in the DB, lets create a new user
                        console.log('adding user to db')
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
                console.log('call addUserToDB');
                (this.addUserToDB())
            })
        }
    }

    render(){
        const { isLoading } = this.props.auth0
        console.log('isLoading: '+isLoading);
        
        
        if (this.state.done) {
            console.log('redirecting');
            return(<Redirect to='/'/>);
        }
        else{
            return (this.spinner())
        }
    }
}

export default withAuth0(AddUser)