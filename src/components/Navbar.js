import React, { Component } from 'react';
import Radium from 'radium';
import windowSize from 'react-window-size';
import step from '@bloometry/step';
import { Link as RouterLink } from 'react-router-dom';

const Link = Radium(RouterLink);

class Navbar extends Component {
  render() {
    const {
      dark,
    } = this.props;

    const small = this.props.windowWidth <= 768;

    return (
      <div style={styles.container}>
        <a href='/' style={[styles.logo, dark && styles.dark.logo]}>
          Kurkim
        </a>

        {small && <div style={[styles.links.item, dark && styles.dark.links.item, small && styles.small.links.item]}>
          <Link to='/blog' style={[styles.links.button, dark && styles.dark.links.button]}>
            Tinklaraštis
          </Link>
        </div>}

        {!small && <div style={[styles.links.container, small && styles.small.links.container]}>
          <a href='/people#cards' style={[styles.links.item, dark && styles.dark.links.item, small && styles.small.links.item]}>
            Žmonės
          </a>
          <a href='/events#cards' style={[styles.links.item, dark && styles.dark.links.item, small && styles.small.links.item]}>
            Renginiai
          </a>
          <a href='/jobs#cards' style={[styles.links.item, dark && styles.dark.links.item, small && styles.small.links.item]}>
            Darbo skelbimai
          </a>
          <div style={[styles.links.item, dark && styles.dark.links.item, small && styles.small.links.item]}>
            <Link to='/blog' style={[styles.links.button, dark && styles.dark.links.button]}>
              Tinklaraštis
            </Link>
          </div>
        </div>}
      </div>
    );
  }
}

export default windowSize(Radium(Navbar));

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: step(2),
  },
  logo: {
    fontSize: '20px',
    lineHeight: '60px',
    color: '#fff',
    display: 'block',
    textDecoration: 'none',
    backgroundImage: 'url("/logo-oval-white.svg")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    paddingLeft: '30px',
  },
  links: {
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    item: {
      paddingLeft: '50px',
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

      ':hover': {
        background: 'hsla(0, 0%, 0%, .05)',
        // background: 'hsla(229, 47%, 47%, .8)',
      },
    },
  },
  dark: {
    logo: {
      color: '#000',
      backgroundImage: 'url("/logo-oval-black.svg")',
    },
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
};
