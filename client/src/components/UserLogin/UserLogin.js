import React from "react";
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { useAuth0 } from "@auth0/auth0-react";

const UserLogin = () => {
    const {isAuthenticated} = useAuth0();
    if (isAuthenticated){
        return(
            <LogoutButton />
        )
    }
    else{
        return(
            <LoginButton />
        )
    }

};

export default UserLogin;