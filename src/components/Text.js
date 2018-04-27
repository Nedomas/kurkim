import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';

import fluid from '@bloometry/fluid';
import colors from '../theme/colors';
import Container from './Container';

class Text extends Component {
  render() {
    const {
      level = 1,
      tight,
      grey,
      center,
      medium,
      bold,
      italic,
      underline,
      uppercase,
      color,
      style,
      flowerful,
      children,
      block,
    } = this.props;

    return (
      <Container
        {...this.props}
        style={[
          styles[level - 1],
          tight && tightStyles[level - 1],
          center && { textAlign: 'center' },
          grey && { color: colors.grey },
          medium && { fontWeight: 500 },
          bold && { fontWeight: 600 },
          italic && { fontStyle: 'italic' },
          underline && { textDecoration: 'underline' },
          uppercase && { textTransform: 'uppercase' },
          color && { color },
          flowerful && customStyles.flowerful,
          block && { display: 'block' },
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
    fontSize: fluid(15, 16),
    lineHeight: fluid(17, 18),
  },
  {
    fontSize: fluid(18, 22),
    lineHeight: fluid(26, 36),
  },
  {
    fontSize: fluid(20, 39),
    lineHeight: fluid(25, 44),
  },
];

const tightStyles = [
  {
    lineHeight: fluid(15, 16),
  },
  {
    lineHeight: fluid(18, 22),
  },
  {
    lineHeight: fluid(34, 39),
  },
];

const customStyles = {
  flowerful: {
    background: 'url("flowerful.jpg")',
    color: 'transparent',
    backgroundSize: 'contain',
    backgroundClip: 'text',
    webkitFontSmoothing: 'antialiased',
    webkitBackgroundClip: 'text',
    mozBackgroundClip: 'text',
    webkitTextFillColor: 'transparent',
  },
};

export default compose(
  Radium,
)(Text);
