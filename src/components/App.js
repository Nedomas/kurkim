import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Navbar from './Navbar';
import Landing from './Landing';
import Profile from './Profile';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route path='/' exact component={Landing} />
        <Route path='/profile/:personId' exact component={Profile} />
      </div>
    );
  }
}
