import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Landing from './Landing';
import CreativesSignup from './CreativesSignup';
import About from './About';

import Job from './Job';
import ApplyPerson from './ApplyPerson';
import Blog from './Blog';
import BlogPost from './BlogPost';
import Company from './Company';

export default class App extends Component {
  render() {
    return (
      <div>
        <Route path='/' exact component={Landing} />
        <Route path='/cities/:city' exact component={Landing} />
        <Route path='/jobs/:id' exact component={Job} />
        <Route path='/apply/person' exact component={ApplyPerson} />
        <Route path='/blog' exact component={Blog} />
        <Route path='/blog/:slug' exact component={BlogPost} />
        <Route path='/companies/:slug' exact component={Company} />
        <Route path='/creatives/signup' exact component={CreativesSignup} />
        <Route path='/about' exact component={About} />
      </div>
    );
  }
}
