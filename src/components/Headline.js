import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';

import fluid from '@bloometry/fluid';

import Text from './Text';

class Headline extends Component {
  render() {
    const {
      level = 1,
      children,
    } = this.props;

    return (
      <Text
        {...this.props}
        component={`h${level}`}
        style={styles[level - 1]}
      >
        {children}
      </Text>
    );
  }
};

const styles = [
  {
    fontSize: fluid(40, 140),
    lineHeight: fluid(60, 150),
  },
  {
    fontSize: fluid(35, 50),
    lineHeight: fluid(40, 55),
  },
  {
    fontSize: fluid(24, 30),
    lineHeight: fluid(28, 34),
  },
  {
    fontSize: fluid(20, 24),
    lineHeight: fluid(23, 33),
  },
];

export default compose(
  Radium,
)(Headline);
