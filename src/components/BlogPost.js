import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'redux';
import Radium from 'radium';
import _ from 'lodash';
import { Helmet } from 'react-helmet';

import Navbar from './Navbar';
import BlogPostMeta from './BlogPostMeta';
import BlogPostAuthor from './BlogPostAuthor';
import Container from './Container';
import Headline from './Headline';
import Markdown from './Markdown';
import Text from './Text';
import step from '@bloometry/step';
import colors from '../theme/colors';
import fluid from '@bloometry/fluid';
import borderRadius from '../theme/borderRadius';
import constrain from '../theme/constrain';

class BlogPost extends Component {
  render() {
    const {
      data: {
        loading,
      },
    } = this.props;

    if (loading) return <div />;

    const {
      data: {
        BlogPost,
        BlogPost: {
          headline,
          teaser,
          content,
          ogTitle,
          ogDescription,
          ogImage,
          displayImage: {
            url: displayImageUrl,
          },
          author,
        },
      },
    } = this.props;

    return (
      <div>
        <Helmet>
          <meta property='og:title' content={ogTitle || headline} />
          <meta property='og:description' content={ogDescription || teaser} />
          <meta property='og:image' content={_.get(ogImage, 'url') || displayImageUrl} />
        </Helmet>

        <Navbar dark {...this.props} />

        <div style={[styles.displayImage, { backgroundImage: `url('${displayImageUrl}')` }]} />

        <Container center style={styles.container}>
          <Headline>
            {headline}
          </Headline>
          <BlogPostMeta blogPost={BlogPost} />
          <Headline tier={3} style={styles.teaser} color={colors.black}>
            {teaser}
          </Headline>
          <Markdown source={content} />
          <BlogPostAuthor author={author} />
        </Container>
      </div>
    );
  }
};

const styles = {
  displayImage: {
    width: '100%',
    height: fluid(200, 400),
    backgroundSize: 'cover',
  },
  container: {
    backgroundColor: colors.white,
    marginTop: fluid(-100, -200),
    maxWidth: '800px',
    padding: step(2),
    borderRadius,
    textAlign: 'left',
  },
  teaser: {
    padding: `${step(3)} 0 ${step()}`,
  },
};

export const BlogPostQuery = gql`
  query BlogPostQuery($slug: String) {
    BlogPost(slug: $slug) {
      headline
      content
      teaser
      timeToRead

      ogTitle
      ogDescription
      ogImage {
        url
      }

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
  graphql(BlogPostQuery, {
    options: ({
      match: {
        params: {
          slug,
        },
      },
    }) => ({
      variables: {
        slug,
      },
    }),
  }),
  Radium,
)(BlogPost);
