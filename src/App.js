import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navigator from './components/Navigator/Navigator'
import Browse from './components/Browse/Browse'
import Search from './components/Search/Search'
import List from './components/List/List'
import Profile from './components/Profile/Profile';
import PageNotFound from './components/PageNotFound/PageNotFound'

import { Auth0Provider } from "@auth0/auth0-react";

class App extends Component {
  render() {
    return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <Router>
      <Navigator/>
        <Switch>
            <Route path="/" exact component={Browse} />
            <Route path="/search" exact component={Search} />
            <Route path="/list" exact component={List} />
            <Route path="/profile" exact component={Profile} />
            <Route path='*' component={PageNotFound} />
        </Switch>
      </Router>
    </Auth0Provider>
    );
  }
}

export default App;