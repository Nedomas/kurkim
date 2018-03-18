import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'redux';
import _ from 'lodash';

import Navbar from './Navbar';
import BlogPostItem from './BlogPostItem';
import Container from './Container';
import Headline from './Headline';
import Footer from './Footer';
import Text from './Text';
import BlogPostList from './BlogPostList';
import Markdown from './Markdown';
import step from '@bloometry/step';
import fluid from '@bloometry/fluid';

class Blog extends Component {
  render() {
    return (
      <div>
        <Navbar dark {...this.props} />
        <BlogPostList {...this.props} />
        <Footer {...this.props} />
      </div>
    );
  }
};


export default compose(
)(Blog);
