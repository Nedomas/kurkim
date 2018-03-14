import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Landing from './Landing';
import Jobs from './Jobs';
import Events from './Events';
import People from './People';

import Job from './Job';
import Profile from './Profile';
import ApplyPerson from './ApplyPerson';
import Blog from './Blog';
import BlogPost from './BlogPost';

export default class App extends Component {
  render() {
    return (
      <div>
        <Route path='/' exact component={Landing} />
        <Route path='/jobs' exact component={Jobs} />
        <Route path='/jobs/:id' exact component={Job} />
        <Route path='/events' exact component={Events} />
        <Route path='/people' exact component={People} />
        <Route path='/profile/:personId' exact component={Profile} />
        <Route path='/apply/person' exact component={ApplyPerson} />
        <Route path='/blog' exact component={Blog} />
        <Route path='/blog/:slug' exact component={BlogPost} />
      </div>
    );
  }
}
