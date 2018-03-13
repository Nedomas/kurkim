import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';
import moment from 'moment';

import colors from '../theme/colors';
import fluid from '@bloometry/fluid';

class BlogPostMeta extends Component {
  render() {
    const {
      blogPost: {
        createdAt,
        timeToRead,
      },
    } = this.props;

    return (
      <div style={styles.container}>
        {moment(createdAt).format('MMM d, YYYY')} | {timeToRead} skaitymas
      </div>
    );
  }
};

const styles = {
  container: {
    color: colors.grey,
    fontSize: fluid(16, 17),
    fontWeight: 550,
  },
};

export default compose(
  Radium,
)(BlogPostMeta);
