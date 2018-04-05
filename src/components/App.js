import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import lt from 'moment/locale/lt';

import Landing from './Landing';
import CreativesSignup from './CreativesSignup';
import About from './About';

import Job from './Job';
import Blog from './Blog';
import BlogPost from './BlogPost';
import Company from './Company';
import imageUrl from '../theme/imageUrl';
import ogUrl from '../theme/ogUrl';

moment.locale('lt');

class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>
            {_.get(this.props.data, 'title.content')}
          </title>
          <meta name='description' content={_.get(this.props.data, 'ogDescription.content')} />

          <meta property='og:title' content={_.get(this.props.data, 'ogTitle.content')} />
          <meta property='og:description' content={_.get(this.props.data, 'ogDescription.content')} />
          <meta property='og:image' content={imageUrl(_.get(this.props.data, 'ogImage.image'), { ogImage: true })} />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='630' />
          <meta property='og:image:type' content='image/jpg' />
          <meta property='og:url' content={ogUrl()} />
          <link rel='canonical' href={ogUrl()} />
          <meta property='og:type' content='website' />
          <meta property='og:locale' content='lt_LT' />
          <meta property='og:site_name' content='Kurkim' />
        </Helmet>

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

const AppQuery = gql`
  query AppQuery {
    title: CustomText(slug: "default-title") {
      content
    }

    ogTitle: CustomText(slug: "default-og-title") {
      content
    }

    ogDescription: CustomText(slug: "default-og-description") {
      content
    }

    ogImage: CustomText(slug: "default-og-image") {
      image {
        handle
      }
    }
  }
`;

export default compose(
  graphql(AppQuery),
)(App);
