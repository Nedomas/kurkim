import React, { Component } from 'react';
import Radium from 'radium';

class Navbar extends Component {
  render() {
    return (
      <div style={styles.container}>
        <a href='/' style={styles.logo}>
          Chilli
          <br/>
          Con Arte
        </a>

        <div style={styles.links.container}>
          <a href='/' style={styles.links.item}>
            Blogas
          </a>
          <div style={styles.links.item}>
            <a href='/' style={styles.links.button}>
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
    fontWeight: 600,
    fontSize: '25px',
    lineHeight: '30px',
    color: '#000',
    textTransform: 'uppercase',
    fontFamily: '"CT Cinetype"',
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
      fontWeight: 600,
      fontFamily: '"CT Cinetype"',
      fontSize: '15px',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      display: 'block',
      textDecoration: 'none',
    },
    button: {
      marginTop: '-4px',
      background: 'none',
      border: '3px solid #000',
      padding: '13px 20px',
      color: '#000',
      fontWeight: 600,
      display: 'block',
      textDecoration: 'none',
    },
  },
};
