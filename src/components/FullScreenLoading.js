import React, { Component } from 'react';
import { compose } from 'redux';
import Radium, { StyleRoot } from 'radium';

import fluid from '@bloometry/fluid';
import Container from './Container';
import colors from '../theme/colors';

class FullScreenLoading extends Component {
  render() {
    return (
      <Container middle style={[styles.container, this.props.style]}>
        <StyleRoot>
          <img style={[styles.img, styles.oval]} src='/logo-oval-black.svg'/>
          <img style={[styles.img, styles.imperfectOval]} src='/imperfect-oval.svg'/>
          <img style={[styles.img, styles.egg]} src='/egg.svg'/>
          <img style={[styles.img, styles.line]} src='/line.svg'/>
        </StyleRoot>
      </Container>
    );
  }
};

const spinAnimation = Radium.keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
})

const styles = {
  container: {
    height: '90vh',
    position: 'relative',
  },
  img: {
    height: '80px',
    width: '80px',
    position: 'absolute',
    top: 'calc(50vh - 40px)',
    left: 'calc(50vw - 40px)',
    animationName: spinAnimation,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
  oval: {
    animationDuration: '2000ms',
  },
  imperfectOval: {
    animationDuration: '2000ms',
  },
  egg: {
    animationDuration: '3000ms',
    animationDirection: 'reverse',
  },
  line: {
    animationDuration: '10000ms',
    animationDirection: 'reverse',
  },
};

export default compose(
  Radium,
)(FullScreenLoading);
