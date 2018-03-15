import React, { Component } from 'react';
import Radium from 'radium';
import { compose } from 'redux';
import { Link as RouterLink } from 'react-router-dom';

import Container from './Container';
import Logo from './Logo';

import colors from '../theme/colors';
import fluid from '@bloometry/fluid';
import step from '@bloometry/step';
import constrain from '../theme/constrain';

const Link = Radium(RouterLink);

class Footer extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Container style={styles.innerContainer}>
          <Logo dark {...this.props} style={styles.logo} />
          <div style={styles.linksContainer}>
            <Link key='creatives-signup' to='/creatives/signup' style={styles.link}>
              Kūrybingiems
            </Link>
            <Link key='events' to='/events#cards' style={styles.link}>
              Renginiai
            </Link>
            <Link key='jobs' to='/jobs#cards' style={styles.link}>
              Darbo skelbimai
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
    backgroundColor: colors.lightLightBlack,
  },
  innerContainer: {
    padding: `${step(2)} 0 ${step()}`,
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
};

export default compose(
  Radium,
)(Footer);