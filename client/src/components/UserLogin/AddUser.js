import { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";
import { Spinner } from "react-bootstrap";

class AddUser extends Component{

    constructor(props){
        super(props)
        this.state={
            loading: false,
            done: false
        }
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
                            fav_movies: [],
                            email: user.email
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
            return(<Spinner />)
        }
    }
}

export default withAuth0(AddUser)