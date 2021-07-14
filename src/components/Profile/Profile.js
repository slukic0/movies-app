import React, { Component } from "react";
import {withAuth0 } from "@auth0/auth0-react";

class Profile extends Component {

  render() {
    const { user, isAuthenticated, isLoading } = this.props.auth0

    if (!isAuthenticated){
      return (
        <div class="alert alert-danger" role="alert">
          Please log in to view your profile!
        </div>
      )
    }
    else if (isLoading) {
      return <div>Loading ...</div>;
    }
    
    else{
      return (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.sub}</p>
        </div>
      )
    }
  }
};

export default withAuth0(Profile);