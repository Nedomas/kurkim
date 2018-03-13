import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';

import round from '@bloometry/round';
import fluid from '@bloometry/fluid';

class BlogPostAvatar extends Component {
  render() {
    const {
      url,
      center,
    } = this.props;

    return (
      <div style={[styles.container, center && { margin: '0 auto' }]}>
        <img alt='avatar' src={url} style={styles.img} />
      </div>
    );
  }
};

const styles = {
  container: {
    width: fluid(50, 70),
  },
  img: {
    width: '100%',
    borderRadius: round,
  },
};

export default compose(
  Radium,
)(BlogPostAvatar);
