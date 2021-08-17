import React, { Component } from 'react';
import { Nav, Navbar, Container, Image } from 'react-bootstrap';
// eslint-disable-next-line
import { BrowserRouter as Route, Link } from "react-router-dom";
import UserLogin from '../UserLogin//UserLogin'
import githubIcon from '../../images/GitHub-Mark-32px.png'
import homeIcon from '../../images/home.png'


class Navigator extends Component{
    render(){
        return(
                <Navbar bg="light" expand="md" collapseOnSelect sticky='top'>
                    <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="home"
                            src={homeIcon}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}        
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link eventKey="1" as={Link} to="/">Popular Movies</Nav.Link>
                            <Nav.Link eventKey="2" as={Link} to="/search">Search Movies</Nav.Link>
                            <Nav.Link eventKey="3" as={Link} to="/list">Favourites</Nav.Link>
                        </Nav>
                        <Nav className="mr-auto">
                            <Nav.Link eventKey="4" as={Link} to="/profile">Profile</Nav.Link>
                            <UserLogin/>
                        </Nav>
                        <Nav.Link eventKey="5" href='https://github.com/Laemonz/movies-app' target='_blank' rel="noopener noreferrer">
                            <Image src={githubIcon} />
                        </Nav.Link>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
        )
    }
}

export default Navigator