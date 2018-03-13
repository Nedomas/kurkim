import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';

import fluid from '@bloometry/fluid';
import step from '@bloometry/step';
import colors from '../theme/colors';

class Headline extends Component {
  render() {
    const {
      style,
      grey,
      children,
      tier = 1,
      center,
    } = this.props;

    const TagName = `h${tier}`;

    return (
      <TagName style={[styles[tier - 1], grey && { color: colors.grey }, center && { textAlign: 'center' }, style]}>
        {children}
      </TagName>
    );
  }
};

const styles = [
  {
    fontSize: fluid(50, 80),
    paddingBottom: step(),
  },
  {
    fontSize: fluid(30, 40),
    paddingBottom: step(),
  },
  {
    fontSize: fluid(24, 32),
    paddingBottom: step(),
  },
  {
    fontSize: fluid(20, 30),
    paddingBottom: step(),
  },
];

export default compose(
  Radium,
)(Headline);
