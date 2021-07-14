import React, { Component } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
// eslint-disable-next-line
import { BrowserRouter as Route, Link } from "react-router-dom";
import UserLogin from '../UserLogin//UserLogin'

class Navigator extends Component{
    render(){
        return(
            <Navbar bg="light" expand="lg" sticky='top'>
            <Container fluid>
                <Navbar.Brand href="/">Movies-App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Popular Movies</Nav.Link>
                    <Nav.Link as={Link} to="/search">Search Movie</Nav.Link>
                    <Nav.Link as={Link} to="/list">Favourites</Nav.Link>
                    <Nav.Link href='https://github.com/Laemonz/movies-app' target='_blank' rel="noopener noreferrer">View Source</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                    <UserLogin/>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        )
    }
}

export default Navigator