import React, { Component } from 'react';
import { compose } from 'redux';
import Radium, { StyleRoot } from 'radium';

import Container from './Container';
import Icon from './Icon';

class FullScreenLoading extends Component {
  render() {
    return (
      <Container middle style={[styles.container, this.props.style]}>
        <StyleRoot>
          <Icon type='oval' style={[styles.img, styles.oval]} />
          <Icon type='egg' style={[styles.img, styles.egg]} />
          <Icon type='imperfectOval' style={[styles.img, styles.imperfectOval]} />
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
