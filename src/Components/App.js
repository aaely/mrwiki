import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
        
        <Switch>
          <Route component={Dashboard} exact path="/" />
          
        </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;