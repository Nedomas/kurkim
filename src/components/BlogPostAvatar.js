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
      big,
    } = this.props;

    return (
      <div style={[styles.container, center && { margin: '0 auto' }, big && styles.big.container]}>
        <img alt='avatar' src={url} style={[styles.img, big && styles.big.img]} />
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
  big: {
    container: {
      width: fluid(150, 200),
    },
    img: {
      borderRadius: 0,
    },
  },
};

export default compose(
  Radium,
)(BlogPostAvatar);
