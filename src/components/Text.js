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
      level = 1,
      grey,
      center,
      medium,
      bold,
      italic,
      underline,
      color,
      style,
      children,
    } = this.props;

    return (
      <Container
        {...this.props}
        style={[
          styles[level - 1],
          center && { textAlign: 'center' },
          grey && { color: colors.grey },
          medium && { fontWeight: 500 },
          bold && { fontWeight: 600 },
          italic && { fontStyle: 'italic' },
          underline && { textDecoration: 'underline' },
          color && { color },
          style,
        ]}
      >
        {children}
      </Container>
    );
  }
};

const styles = [
  {
    fontSize: fluid(18, 22),
    lineHeight: fluid(26, 36),
  },
  {
    fontSize: fluid(34, 39),
    lineHeight: fluid(39, 44),
  },
];

export default compose(
  Radium,
)(Text);
