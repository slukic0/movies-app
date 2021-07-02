import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const FavButton = (props) => {
    const {isAuthenticated} = useAuth0();
    return(
        <button onClick={props.onClick} class="btn btn-primary" type='button' disabled={!isAuthenticated}>Favourite</button>
    )
};

export default FavButton;