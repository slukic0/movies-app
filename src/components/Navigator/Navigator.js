import React, { Component } from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


class Navigator extends Component{
    render() {
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <Link to="/" class="navbar-brand">Movies-App</Link>
                <div class="collpase navbar-collapse">
                    <ul class="navbar-nav mr-auto">
                        <li class="navbar-item">
                            <Link to="/" class="nav-link">Popular Movies</Link>
                        </li>
                        <li class="navbar-item">
                            <Link to="/search" class="nav-link">Search Movie</Link>
                        </li>
                        <li class="navbar-item">
                            <Link to="/list" class="nav-link">Favourites</Link>
                        </li>
                        <li class="navbar-item" style={{cursor: 'pointer'}}>
                            <a href='https://github.com/Laemonz/movies-app' class="nav-link" target='_blank' rel="noopener noreferrer">View Source</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navigator