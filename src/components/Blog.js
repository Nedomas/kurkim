import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'redux';
import _ from 'lodash';

import Navbar from './Navbar';
import BlogPostItem from './BlogPostItem';
import Container from './Container';
import Headline from './Headline';
import step from '@bloometry/step';

class Blog extends Component {
  render() {
    const {
      data: {
        loading,
      },
    } = this.props;

    if (loading) return <div />;

    const {
      data: {
        allBlogPosts,
      },
    } = this.props;

    return (
      <div>
        <Navbar dark {...this.props} />

        <Container left style={styles.container}>
          <Headline>
            Tinklaraštis
          </Headline>

          <Headline tier={2}>
            Kūrybingi pasvaigimai ir panašiai.
          </Headline>

          <div style={styles.blogPosts.container}>
            {_.isEmpty(allBlogPosts) && 'Vis dar nieko neprikeverzojom.'}
            {_.map(allBlogPosts, (blogPost) => {
              return <BlogPostItem key={blogPost.slug} blogPost={blogPost} />;
            })}
          </div>
        </Container>
      </div>
    );
  }
};

const styles = {
  container: {
    minHeight: '70vh',
  },
  blogPosts: {
    container: {
      paddingTop: step(),
    },
  },
};


export const BlogPostsQuery = gql`
  query BlogPostsQuery($isPublished: Boolean!) {
    allBlogPosts(filter: {
      isPublished: $isPublished,
    },
    orderBy: createdAt_DESC) {
      slug
      headline
      teaser
      createdAt
      timeToRead
      displayImage {
        url
      }

      author {
        fullName
        title
        avatarOnly
        avatar {
          url
        }
      }
    }
}
`;

export default compose(
  graphql(BlogPostsQuery, {
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
)(Blog);
