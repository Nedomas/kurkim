import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import fluid from '@bloometry/fluid';
import step from '@bloometry/step';
import windowSize from 'react-window-size';

import colors from '../theme/colors';
import maxReadableWidth from '../theme/maxReadableWidth';
import Headline from './Headline';
import Navbar from './Navbar';
import Container from './Container';
import Icon from './Icon';

class Splash extends Component {
  render() {
    const small = this.props.windowWidth <= 768;
    const big = this.props.windowWidth > 1300;

    return (
      <Container style={styles.container}>
        <div style={styles.innerContainer}>
          <div style={styles.elementContainer}>
          <StyleRoot>
            <Icon type='oval' style={[styles.img, styles.oval]} />
            <Icon type='egg' style={[styles.img, styles.egg]} />
            <Icon type='imperfectOval' style={[styles.img, styles.imperfectOval]} />
          </StyleRoot>
        </div>

          <div style={styles.elementContainer}>
            <Navbar dark />

            <Container pad padNavbar>
              <Headline center color={colors.yellow} uppercase bold marginTopRaw={fluid(150, 90)}>
                kūrybingiems
              </Headline>
            </Container>
          </div>
        </div>
      </Container>
    );
  }
}

export default windowSize(Radium(Splash));

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
    color: colors.red,
    // background: 'radial-gradient(hsla(380, 92%, 70%, 1), hsla(359, 95%, 70%, 1))',
    backgroundImage: 'url("/splash-bg.png")',
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    overflow: 'hidden',
  },
  content: {
    container: {
      padding: `0vh 20vw ${step(5)} ${step()}`,
      margin: '0 auto',
    },
  },
  innerContainer: {
    position: 'relative',
    height: '110vh',
    width: '100vw',
  },
  elementContainer: {
    position: 'absolute',
    height: '110vh',
    width: '100vw',
  },
  img: {
    height: fluid(150, 500),
    width: fluid(150, 500),
    position: 'absolute',
    top: fluid(245, 100),
    left: fluid(300, 900),
    animationName: spinAnimation,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
  oval: {
    animationDuration: '100000ms',
  },
  imperfectOval: {
    animationDuration: '80000ms',
  },
  egg: {
    animationDuration: '100000ms',
    animationDirection: 'reverse',
  },
};
