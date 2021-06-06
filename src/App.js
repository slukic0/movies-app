import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navigator from './components/Navigator/Navigator'
import Browse from './components/Browse/Browse'
import Search from './components/Search/Search'
import List from './components/List/List'


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <div class="container">
            <Navigator/>
            <br/>
            <Route path="/" exact component={Browse} />
            <Route path="/search" component={Search} />
            <Route path="/list" component={List} />
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;