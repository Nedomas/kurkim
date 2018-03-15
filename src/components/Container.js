import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';
import windowSize from 'react-window-size';

import step from '@bloometry/step';
import fluid from '@bloometry/fluid';
import constrain from '../theme/constrain';
import maxReadableWidth from '../theme/maxReadableWidth';

class Container extends Component {
  render() {
    const {
      style,
      center,
      middle,
      narrow,
      limited,
      left,
      right,
      chaos,
      dark,
      minWindowHeight,
      windowWidth,
      pad,
      readable,
      padTop,
      padBottom,
      spaceBetween,
      children,
      component = 'div',
    } = this.props;

    const small = windowWidth <= 650;
    const TagName = component;

    return (
      <TagName
        {...this.props}
        style={[
          center && styles.center,
          narrow && styles.narrow,
          limited && styles.limited,
          chaos && styles.chaos,
          dark && chaos && styles.dark.chaos,
          minWindowHeight && styles.minWindowHeight,
          small && styles.small,
          middle && styles.middle,
          left && styles.left,
          right && styles.right,
          spaceBetween && styles.spaceBetween,
          pad && { padding: step(2) },
          padTop && { paddingTop: step(padTop || 1) },
          padBottom && { paddingBottom: step(padBottom || 1) },
          readable && styles.readable,
          style,
        ]}
      >
        {children}
      </TagName>
    );
  }
};

const styles = {
  minWindowHeight: {
    minHeight: '80vh',
  },
  center: {
    textAlign: 'center',
    margin: '0 auto',
  },
  middle: {
    display: 'flex',
    minHeight: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  small: {
    // display: 'block',
    // textAlign: 'center',
    // margin: '0 auto',
  },
  narrow: {
    width: '100%',
    maxWidth: '300px',
  },
  limited: {
    maxWidth: '700px',
  },
  left: {
    textAlign: 'left',
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chaos: {
    backgroundImage: 'url("/splash.svg")',
    backgroundSize: fluid(200, 400),
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '95% 40%',
  },
  dark: {
    chaos: {
      backgroundImage: 'url("/chaos-black.svg")',
    },
  },
  readable: {
    maxWidth: maxReadableWidth,
    margin: '0 auto',
  },
};

export default compose(
  windowSize,
  Radium,
)(Container);
