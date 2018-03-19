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
import FullScreenLoading from './FullScreenLoading';
import Markdown from './Markdown';
import step from '@bloometry/step';
import fluid from '@bloometry/fluid';

class BlogPostList extends Component {
  render() {
    const {
      data: {
        loading,
      },
    } = this.props;

    if (loading) return <FullScreenLoading />;

    const {
      data: {
        allBlogPosts,
      },
      hideEmpty,
    } = this.props;

    return (
      <Container pad center readable padNavbar>
        {!hideEmpty && _.isEmpty(allBlogPosts) && <Text center level={3} chaos dark minWindowHeight>Vis dar nieko neprikeverzojom.</Text>}
        {_.map(allBlogPosts, (blogPost) => {
          return <BlogPostItem key={blogPost.slug} blogPost={blogPost} />;
        })}
      </Container>
    );
  }
};

export const BlogPostListQuery = gql`
  query BlogPostListQuery($isPublished: Boolean!) {
    allBlogPosts(filter: {
      isPublished: $isPublished,
    },
    orderBy: createdAt_DESC) {
      id
      slug
      headline
      teaser
      createdAt
      timeToRead
      displayImage {
        handle
      }

      author {
        fullName
        title
        avatarOnly
        avatar {
          handle
        }
      }
    }
}
`;

export default compose(
  graphql(BlogPostListQuery, {
    options: ({
      location: {
        search,
      },
    }) => ({
      variables: {
        isPublished: search !== '?unpublished',
      },
    }),
  }),
)(BlogPostList);
