import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'redux';
import Radium from 'radium';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import windowSize from 'react-window-size';

import Navbar from './Navbar';
import BlogPostMeta from './BlogPostMeta';
import Footer from './Footer';
import BlogPostAuthor from './BlogPostAuthor';
import Container from './Container';
import Headline from './Headline';
import Markdown from './Markdown';
import Text from './Text';
import FullScreenLoading from './FullScreenLoading';

import step from '@bloometry/step';
import colors from '../theme/colors';
import isSmall from '../theme/isSmall';
import fluid from '@bloometry/fluid';
import borderRadius from '../theme/borderRadius';
import constrain from '../theme/constrain';
import imageUrl from '../theme/imageUrl';

class BlogPost extends Component {
  render() {
    const {
      data: {
        loading,
      },
    } = this.props;

    if (loading) return <FullScreenLoading />;

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
          displayImage,
          author,
        },
      },
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>
            {ogTitle || headline}
          </title>
          <meta name='description' content={ogDescription || teaser} />

          <meta property='og:title' content={ogTitle || headline} />
          <meta property='og:description' content={ogDescription || teaser} />
          <meta property='og:image' content={imageUrl(ogImage) || imageUrl(displayImage)} />
        </Helmet>

        <Navbar dark {...this.props} />

        <div style={[styles.displayImage, { backgroundImage: `url('${imageUrl(displayImage)}')` }]} />

        <Container pad readable center style={[styles.container, isSmall(this) && styles.small.container]}>
          <Container left>
            <Headline bold level={2}>
              {headline}
            </Headline>
            <BlogPostMeta level={2} blogPost={BlogPost} />
            <Text color={colors.lighterBlack}>
              <Markdown source={content} />
            </Text>
            <BlogPostAuthor author={author} />
          </Container>
        </Container>

        <Footer {...this.props} />
      </div>
    );
  }
};

const styles = {
  displayImage: {
    width: '100%',
    height: fluid(200, 700),
    backgroundSize: 'cover',
  },
  container: {
    backgroundColor: colors.white,
    marginTop: fluid(-100, -200),
    borderRadius,
  },
  teaser: {
    padding: `${step(3)} 0 ${step()}`,
  },
  small: {
    container: {
      borderRadius: 0,
    },
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
        handle
      }

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
  windowSize,
  Radium,
)(BlogPost);
