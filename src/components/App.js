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
        <Route path='/miestai/:city' exact component={Landing} />
        <Route path='/t' exact component={Blog} />
        <Route path='/t/:slug' exact component={BlogPost} />
        <Route path='/i/:slug' exact component={Company} />
        <Route path='/i/:companySlug/:jobSlug' exact component={Job} />
        <Route path='/kurybingiems' exact component={CreativesSignup} />
        <Route path='/apie-kurkim' exact component={About} />
      </div>
    );
  }
}
