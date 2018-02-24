import React, { Component } from 'react';
import Radium from 'radium';
import windowSize from 'react-window-size';

class Navbar extends Component {
  render() {
    const {
      dark,
    } = this.props;

    const small = this.props.windowWidth <= 768;

    return (
      <div style={styles.container}>
        <a href='/' style={[styles.logo, dark && styles.dark.logo]}>
          Chilli con Arte
        </a>

        {small && <div style={[styles.links.item, dark && styles.dark.links.item, small && styles.small.links.item]}>
          <a href='https://vaida6.typeform.com/to/Zuo2lo' target='_blank' style={[styles.links.button, dark && styles.dark.links.button]}>
            Tinklaraštis
          </a>
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
            <a href='https://vaida6.typeform.com/to/Zuo2lo' target='_blank' style={[styles.links.button, dark && styles.dark.links.button]}>
              Tinklaraštis
            </a>
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
    margin: '0 auto',
    padding: '40px',
    maxWidth: '1000px',
  },
  logo: {
    // fontWeight: 600,
    fontSize: '20px',
    lineHeight: '20px',
    color: '#000',
    // textTransform: 'uppercase',
    display: 'block',
    textDecoration: 'none',
  },
  links: {
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    item: {
      paddingLeft: '50px',
      color: '#000',
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
      border: '2px solid #000',
      padding: '8px 15px',
      // borderRadius: '5px',
      color: '#000',
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
    },
    links: {
      item: {
        color: '#000',
      },
      button: {
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
