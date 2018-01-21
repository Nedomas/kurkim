import React, { Component } from 'react';
import Radium from 'radium';

class Navbar extends Component {
  render() {
    const {
      dark,
    } = this.props;

    return (
      <div style={styles.container}>
        <a href='/' style={[styles.logo, dark && styles.dark.logo]}>
          Chilli
          <br/>
          Con Arte
        </a>

        <div style={styles.links.container}>
          <a href='/' style={[styles.links.item, dark && styles.dark.links.item]}>
            Blogas
          </a>
          <a href='/' style={[styles.links.item, dark && styles.dark.links.item]}>
            Žmonės
          </a>
          <a href='/' style={[styles.links.item, dark && styles.dark.links.item]}>
            Renginiai
          </a>
          <a href='/' style={[styles.links.item, dark && styles.dark.links.item]}>
            Darbo skelbimai
          </a>
          <div style={[styles.links.item, dark && styles.dark.links.item]}>
            <a href='/' style={[styles.links.button, dark && styles.dark.links.button]}>
              Įkelti skelbimą
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(Navbar);

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 auto',
    padding: '40px',
  },
  logo: {
    // fontWeight: 600,
    fontSize: '15px',
    lineHeight: '20px',
    color: '#fff',
    textTransform: 'uppercase',
    fontFamily: '"HK Grotesk"',
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
      color: '#fff',
      // fontWeight: 600,
      fontFamily: '"HK Grotesk"',
      fontSize: '13px',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      display: 'block',
      textDecoration: 'none',
    },
    button: {
      marginTop: '-1px',
      background: 'none',
      borderBottom: '1px solid hsla(0, 0%, 100%, .5)',
      // border: '3px solid #000',
      padding: '10px 0',
      color: '#fff',
      // fontWeight: 600,
      display: 'block',
      textDecoration: 'none',
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
        color: '#000',
        borderBottom: '1px solid #000',
      },
    },
  },
};
