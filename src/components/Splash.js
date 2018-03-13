import React, { Component } from 'react';
import Radium from 'radium';
import fluid from '@bloometry/fluid';
import step from '@bloometry/step';
import windowSize from 'react-window-size';

import colors from '../theme/colors';
import Headline from './Headline';
import Navbar from './Navbar';

class Splash extends Component {
  render() {
    const small = this.props.windowWidth <= 768;
    const big = this.props.windowWidth > 1300;

    return (
      <div style={styles.container}>
        <Navbar />

        <div style={styles.content.container}>
          <Headline>
            Kūrybingi darbai
            kūrybingiems
          </Headline>

          <Headline tier={2}>
            Tapk matomas.
            <br/>
            Atrask svajonių darbą.
            <br/>
            Scrollink.
          </Headline>
        </div>
      </div>
    );
  }
}

export default windowSize(Radium(Splash));

const styles = {
  container: {
    color: colors.white,
    backgroundImage: 'url("/splash.svg")',
    backgroundSize: fluid(200, 400),
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50vw 25vh',
    backgroundColor: '#F96D6F',
    minHeight: '100vh',
    margin: '0 auto',
    width: '100%',
  },
  content: {
    container: {
      padding: `20vh 20vw ${step()} ${step()}`,
      maxWidth: fluid(600, 600),
      margin: '0 auto',
    },
  },
};
