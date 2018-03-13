import React, { Component } from 'react';
import { compose } from 'redux';
import { Link as RouterLink } from 'react-router-dom';
import Radium from 'radium';

import BlogPostAuthor from './BlogPostAuthor';
import BlogPostMeta from './BlogPostMeta';

import Headline from './Headline';
import step from '@bloometry/step';
import colors from '../theme/colors';
import fluid from '@bloometry/fluid';
import borderRadius from '../theme/borderRadius';

const Link = Radium(RouterLink);

class BlogPostItem extends Component {
  render() {
    const {
      blogPost,
      blogPost: {
        headline,
        slug,
        teaser,
        displayImage: {
          url: displayImageUrl,
        },
        author,
      },
    } = this.props;

    return (
      <Link to={`/blog/${slug}`} style={styles.container}>
        <div
          style={[
            styles.displayImage,
            {
              backgroundImage: `url('${displayImageUrl}')`
            },
          ]}
        />
        <div style={styles.content}>
          <Headline tier={3} style={styles.headline}>
            {headline}
          </Headline>
          <BlogPostMeta blogPost={blogPost} />

          <Headline tier={4} style={styles.teaser}>
            {teaser}
          </Headline>

          <BlogPostAuthor author={author} />
        </div>
      </Link>
    );
  }
};

const styles = {
  container: {
    color: colors.black,
    textDecoration: 'none',
    display: 'block',
    maxWidth: fluid(800, 900),
    borderRadius,
    marginBottom: step(5),
  },
  headline: {
    paddingBottom: step(0.5),
  },
  teaser: {
    paddingTop: step(),
  },
  displayImage: {
    width: '100%',
    height: fluid(200, 400),
    backgroundSize: 'cover',
    borderRadius,
  },
  content: {
    borderRadius,
    margin: `${fluid(-100, -200)} ${step(2)} 0`,
    backgroundColor: colors.white,
    padding: step(2),
  },
};

export default compose(
  Radium,
)(BlogPostItem);
