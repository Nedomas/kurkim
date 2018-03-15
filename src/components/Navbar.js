import React, { Component } from 'react';
import Radium from 'radium';
import windowSize from 'react-window-size';
import { Link as RouterLink } from 'react-router-dom';
import { HamburgerButton } from 'react-hamburger-button';

import step from '@bloometry/step';
import fluid from '@bloometry/fluid';

import Logo from './Logo';
import Container from './Container';
import Text from './Text';
import borderRadius from '../theme/borderRadius';
import colors from '../theme/colors';

const Link = Radium(RouterLink);

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleHamburgerClick() {
    this.setState({
      open: !this.state.open,
    });
  }

  closeHamburger() {
    this.setState({
      open: false,
    });
  }

  render() {
    const {
      open,
    } = this.state;

    const {
      dark,
    } = this.props;

    const small = this.props.windowWidth <= 768;

    return (
      <Container pad style={styles.container}>
        <Logo {...this.props} />

        {!small && <div style={styles.links.container}>
          <Link to='/creatives/signup' style={[styles.links.item, dark && styles.dark.links.item]}>
            Kūrybingiems
          </Link>
          <Link to='/about' style={[styles.links.item, dark && styles.dark.links.item]}>
            Apie Kurkim
          </Link>
          <Link to='/blog' style={[styles.links.item, styles.links.button, dark && styles.dark.links.button]}>
            Tinklaraštis
          </Link>
        </div>}

        {small && <div style={styles.hamburgerButton.container}>
          <HamburgerButton
            open={open}
            onClick={() => this.handleHamburgerClick()}
            height={12}
            width={24}
            color={dark ? colors.black : colors.white}
          />
        </div>}

        {small && open && <Container pad style={styles.hamburger.container}>
          <Container spaceBetween>
            <Logo dark />
            <div style={styles.hamburgerButton.container}>
              <HamburgerButton
                open={open}
                onClick={() => this.handleHamburgerClick()}
                height={12}
                width={24}
                color={colors.black}
              />
            </div>
          </Container>

          <Text tier={2} padBottom padTop={3} component={Link} to='/creatives/signup' style={styles.hamburger.link}>
            Kūrybingiems
          </Text>
          <Text tier={2} padBottom component={Link} to='/about' style={styles.hamburger.link}>
            Apie Kurkim
          </Text>
          <Text tier={2} padBottom component={Link} to='/blog' style={styles.hamburger.link}>
            Tinklaraštis
          </Text>
        </Container>}
      </Container>
    );
  }
}

export default windowSize(Radium(Navbar));

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: `0 0 ${step(4)}`,
  },
  links: {
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    item: {
      marginLeft: step(3),
      color: '#fff',
      // fontWeight: 600,
      fontSize: '13px',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      display: 'block',
      textDecoration: 'none',
    },
    button: {
      // background: 'hsla(229, 47%, 47%, .5)',
      // borderBottom: '1px solid hsla(0, 0%, 100%, .5)',
      border: '2px solid #fff',
      padding: '8px 15px',
      // borderRadius: '5px',
      color: '#fff',
      fontSize: '13px',
      letterSpacing: '1px',
      display: 'block',
      textDecoration: 'none',
      textTransform: 'uppercase',
      borderRadius,

      ':hover': {
        background: 'hsla(0, 0%, 0%, .05)',
        // background: 'hsla(229, 47%, 47%, .8)',
      },
    },
  },
  dark: {
    links: {
      item: {
        color: '#000',
      },
      button: {
        border: '2px solid #000',
        color: '#000',
      },
    },
  },
  open: {
    container: {
      // display: 'block',
    },
  },
  small: {
    links: {
      container: {
        display: 'block',
      },
      item: {
        padding: '10px 0 0',
      },
    },
  },
  hamburgerButton: {
    container: {
      marginLeft: step(2),
      cursor: 'pointer',
    },
  },
  hamburger: {
    container: {
      minHeight: '100vh',
      backgroundColor: colors.white,
      width: fluid(250, 350),
      position: 'fixed',
      right: 0,
      top: 0,
      color: colors.black,
    },
    link: {
      display: 'block',
      color: colors.black,
      textDecoration: 'none',
    },
  },
};
