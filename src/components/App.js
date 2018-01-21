import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Landing from './Landing';
import Jobs from './Jobs';
import Events from './Events';
import People from './People';
import Profile from './Profile';

export default class App extends Component {
  render() {
    return (
      <div>
        <Route path='/' exact component={Landing} />
        <Route path='/jobs' exact component={Jobs} />
        <Route path='/events' exact component={Events} />
        <Route path='/people' exact component={People} />
        <Route path='/profile/:personId' exact component={Profile} />
      </div>
    );
  }
}
