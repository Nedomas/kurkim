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
            <Navbar />

            <div style={styles.content.container}>
              <Headline>
                Kūrybingi darbai
                kūrybingiems
              </Headline>

              <Headline italic tier={2}>
                Tapk matomas.
                <br/>
                Atrask svajonių darbą.
                <br/>
                Scrollink.
              </Headline>
            </div>
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
    color: colors.white,
    background: 'radial-gradient(hsla(380, 92%, 70%, 1), hsla(359, 95%, 70%, 1))',
    overflow: 'hidden',
  },
  content: {
    container: {
      padding: `0vh 20vw ${step(5)} ${step()}`,
      maxWidth: maxReadableWidth,
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
    height: '500px',
    width: '500px',
    position: 'absolute',
    top: '17vh',
    left: '55vw',
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
