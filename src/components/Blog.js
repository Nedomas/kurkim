import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'redux';
import _ from 'lodash';

import Navbar from './Navbar';
import Container from './Container';
import Footer from './Footer';
import BlogPostList from './BlogPostList';
import Markdown from './Markdown';

class Blog extends Component {
  render() {
    return (
      <div>
        <Navbar dark {...this.props} />
        <Container pad>
          <Markdown center source={_.get(this.props.data, 'blog.content')} />
        </Container>
        <BlogPostList {...this.props} />
        <Footer {...this.props} />
      </div>
    );
  }
};

const BlogQuery = gql`
  query BlogQuery {
    blog: CustomText(slug: "blog") {
      content
    }
  }
`;

export default compose(
  graphql(BlogQuery),
)(Blog);
