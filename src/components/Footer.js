import React, { Component } from 'react';
import Radium from 'radium';
import { compose } from 'redux';
import { Link as RouterLink } from 'react-router-dom';
import windowSize from 'react-window-size';

import Container from './Container';
import Logo from './Logo';
import Text from './Text';

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
        <Container pad padTop={isSmall(this) && 5} padBottom={isSmall(this) && 10} style={[styles.innerContainer, isSmall(this) && styles.small.innerContainer]}>
          <Logo dark {...this.props} style={styles.logo} />
          <div style={[styles.linksContainer, isSmall(this) && styles.small.linksContainer]}>
            <Text center={isSmall(this)} level={isSmall(this) ? 3 : 2} padTop={isSmall(this) && 3} component={Link} key='creatives-signup' to='/kurybingiems' style={styles.link}>
              Kūrybingiems
            </Text>
            <Text center={isSmall(this)} level={isSmall(this) ? 3 : 2} padTop={isSmall(this)} component={Link} key='about' to='/apie-kurkim' style={styles.link}>
              Apie Kurkim
            </Text>
            <Text center={isSmall(this)} level={isSmall(this) ? 3 : 2} padTop={isSmall(this)} component={Link} key='blog' to='/t' style={styles.link}>
              Žurnalas
            </Text>
            <Text center={isSmall(this)} level={isSmall(this) ? 3 : 2} padTop={isSmall(this)} component={Link} key='contact-with-us' to='mailto:vaida@kurkim.lt' style={styles.link}>
              Susisiek su mumis
            </Text>
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
    // fontSize: fluid(16, 20),
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
