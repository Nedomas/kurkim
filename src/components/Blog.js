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

class Blog extends Component {
  render() {
    const {
      data: {
        loading,
      },
    } = this.props;

    if (loading) return <FullScreenLoading />;

    const {
      data: {
        Page: {
          content,
        },
        allBlogPosts,
      },
    } = this.props;

    return (
      <div>
        <Container>
          <Navbar dark {...this.props} />

          <Container pad center readable padNavbar>
            <Markdown source={content} />

            <Container>
              {_.isEmpty(allBlogPosts) && <Text center level={3} chaos dark minWindowHeight>Vis dar nieko neprikeverzojom.</Text>}
              {_.map(allBlogPosts, (blogPost) => {
                return <BlogPostItem key={blogPost.slug} blogPost={blogPost} />;
              })}
            </Container>
          </Container>
        </Container>

        <Footer {...this.props} />
      </div>
    );
  }
};

export const BlogQuery = gql`
  query BlogQuery($isPublished: Boolean!) {
    Page(id: "cjets3li54nbl0166dl5lb7l5") {
      content
    }

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
  graphql(BlogQuery, {
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
