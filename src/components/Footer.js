import React, { Component } from 'react';
import Radium from 'radium';
import { compose } from 'redux';
import { Link as RouterLink } from 'react-router-dom';
import windowSize from 'react-window-size';

import Container from './Container';
import Logo from './Logo';

import colors from '../theme/colors';
import fluid from '@bloometry/fluid';
import step from '@bloometry/step';
import constrain from '../theme/constrain';
import isSmall from '../theme/isSmall';

const Link = Radium(RouterLink);

class Footer extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Container pad style={[styles.innerContainer, isSmall(this) && styles.small.innerContainer]}>
          <Logo dark {...this.props} style={styles.logo} />
          <div style={[styles.linksContainer, isSmall(this) && styles.small.linksContainer]}>
            <Link key='creatives-signup' to='/creatives/signup' style={styles.link}>
              Kūrybingiems
            </Link>
            <Link key='about' to='/about' style={styles.link}>
              Apie Kurkim
            </Link>
            <Link key='blog' to='/blog' style={styles.link}>
              Tinklaraštis
            </Link>
          </div>
        </Container>
      </Container>
    );
  }
};

const styles = {
  container: {
    margin: `${step(10)} 0 0`,
    backgroundColor: colors.lightLightBlack,
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linksContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    marginRight: step(),
  },
  link: {
    textDecoration: 'none',
    color: colors.black,
    fontSize: fluid(16, 20),
    display: 'block',
    paddingLeft: step(2),

    ':hover': {
      textDecoration: 'underline',
    },
  },
  small: {
    innerContainer: {
      display: 'block',
    },
    linksContainer: {
      display: 'block',
    },
  },
};

export default compose(
  windowSize,
  Radium,
)(Footer);
