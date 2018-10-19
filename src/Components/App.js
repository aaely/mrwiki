import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Dashboard from './Dashboard';
import Vendors from './Vendors';
import Applications from './Applications';
import Properties from './Properties';
import Navbar from './Navbar';
import Apps from './Apps';
import Props from './Props';
import Vends from './Vends';

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
          <Route component={Vends} path="/vendors" />
          <Route component={Apps} path="/apps" />
          <Route component={Props} path="/properties" />
        </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;