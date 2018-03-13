import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';

import BlogPostAvatar from './BlogPostAvatar';

import step from '@bloometry/step';
import fluid from '@bloometry/fluid';
import colors from '../theme/colors';

class BlogPostAuthor extends Component {
  render() {
    const {
      author: {
        fullName,
        title,
        avatar: {
          url,
        },
      },
    } = this.props;

    return (
      <div style={styles.container}>
        <BlogPostAvatar url={url} />
        <div style={styles.content}>
          <div>
            {fullName}
          </div>
          <div>
            {title}
          </div>
        </div>
      </div>
    );
  }
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: step(),
  },
  content: {
    padding: `0 ${step()}`,
    color: colors.black,
    fontSize: fluid(16, 19),
  },
};

export default compose(
  Radium,
)(BlogPostAuthor);
