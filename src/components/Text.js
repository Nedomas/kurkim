import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';

import fluid from '@bloometry/fluid';
import step from '@bloometry/step';
import colors from '../theme/colors';
import Container from './Container';

class Text extends Component {
  render() {
    const {
      style,
      grey,
      bold,
      children,
      tier = 1,
      center,
    } = this.props;

    return (
      <Container style={[
        styles[tier - 1],
        grey && { color: colors.grey },
        center && { textAlign: 'center' },
        bold && { fontWeight: 500 },
        style
      ]} {...this.props} >
        {children}
      </Container>
    );
  }
};

const styles = [
  {
    fontSize: fluid(16, 20),
  },
  {
    fontSize: fluid(30, 40),
  },
  {
    fontSize: fluid(20, 20),
    lineHeight: fluid(20, 20),
  },
  {
    fontSize: fluid(14, 15),
  },
];

export default compose(
  Radium,
)(Text);
