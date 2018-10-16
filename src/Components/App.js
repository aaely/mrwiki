import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Dashboard from './Dashboard';
import Vendors from './Vendors';
import Applications from './Applications';
import Properties from './Properties';
import Navbar from './Navbar';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
        <Navbar />
        <Switch>
          <Route component={Dashboard} exact path="/" />
          <Route component={Vendors} path="/vendors/:vendorId" />
          <Route component={Applications} path="/apps/:appId" />
          <Route component={Properties} path="/properties/:propertyId" />
        </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;