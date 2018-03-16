import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';

import fluid from '@bloometry/fluid';
import step from '@bloometry/step';
import colors from '../theme/colors';

import Text from './Text';

class Headline extends Component {
  render() {
    const {
      level = 1,
      children,
    } = this.props;

    console.log(children, level);
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
    fontSize: fluid(50, 80),
  },
  {
    fontSize: fluid(35, 50),
  },
  {
    fontSize: fluid(24, 32),
  },
  {
    fontSize: fluid(20, 30),
  },
];

export default compose(
  Radium,
)(Headline);
