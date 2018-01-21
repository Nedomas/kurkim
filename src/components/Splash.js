import React, { Component } from 'react';
import Radium from 'radium';
import Navbar from './Navbar';

class Splash extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Navbar />

        <div style={styles.content.container}>
          <div style={styles.title}>
            <div>
              Kūrybingi darbai
            </div>
            <div style={styles.titleSecond}>
              kūrybingiems
            </div>
          </div>

          <div style={styles.buttons.container}>
            <a href='/' style={styles.buttons.button}>
              Įkelti darbo skelbimą
            </a>

            <a href='/' style={styles.buttons.button}>
              Esu kūrybingas
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(Splash);

const styles = {
  container: {
    backgroundImage: 'url("/darker3.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    // backgroundPosition: '80% 0',
    minHeight: '100vh',
    margin: '0 auto',
    width: '100%',
  },
  title: {
    fontSize: '80px',
    letterSpacing: '1.2px',
    lineHeight: '75px',
    color: '#fff',
    fontFamily: '"Garamond Premier Pro Display"',
  },
  titleSecond: {
    // color: '#0B24FA'
  },
  content: {
    container: {
      padding: '200px 80px 0',
      margin: '0 auto',
      maxWidth: '1000px',
    },
  },
  buttons: {
    container: {
      display: 'flex',
      paddingTop: '40px',
    },
    button: {
      background: 'none',
      borderBottom: '1px solid hsla(0, 0%, 100%, .5)',
      padding: '10px 0',
      color: '#fff',
      marginRight: '40px',
      fontFamily: '"HK Grotesk"',
      fontSize: '15px',
      letterSpacing: '1px',
      display: 'block',
      textDecoration: 'none',
      textTransform: 'uppercase',
    },
  },
};
