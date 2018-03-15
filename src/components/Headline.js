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
      style,
      grey,
      children,
      medium,
      bold,
      tier = 1,
      center,
    } = this.props;

    return (
      <Text component={`h${tier}`} style={[
        styles[tier - 1],
        grey && { color: colors.grey },
        center && { textAlign: 'center' },
        medium && { fontWeight: 500 },
        bold && { fontWeight: 600 },
        style
      ]}>
        {children}
      </Text>
    );
  }
};

const styles = [
  {
    fontSize: fluid(50, 80),
    fontWeight: 500,
  },
  {
    fontSize: fluid(35, 50),
    fontWeight: 500,
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
