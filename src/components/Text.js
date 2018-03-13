import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';

import fluid from '@bloometry/fluid';
import step from '@bloometry/step';
import colors from '../theme/colors';

class Text extends Component {
  render() {
    const {
      style,
      grey,
      children,
      tier = 1,
      center,
    } = this.props;

    return (
      <div style={[styles[tier - 1], grey && { color: colors.grey }, center && { textAlign: 'center' }, style]}>
        {children}
      </div>
    );
  }
};

const styles = [
  {
    fontSize: fluid(16, 20),
    paddingBottom: step(),
  },
  {
    fontSize: fluid(30, 40),
    paddingBottom: step(),
  },
  {
    fontSize: fluid(16, 18),
    paddingBottom: step(),
  },
  {
    fontSize: fluid(20, 30),
    paddingBottom: step(),
  },
];

export default compose(
  Radium,
)(Text);
