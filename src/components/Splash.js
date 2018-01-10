import React, { Component } from 'react';
import Radium from 'radium';

class Splash extends Component {
  render() {
    return (
      <div style={styles.container}>
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
            <button style={styles.buttons.button}>
              Įkelti darbo skelbimą
            </button>

            <button style={styles.buttons.button}>
              Esu kūrybingas
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(Splash);

const styles = {
  container: {
    backgroundImage: 'url("/art2.jpg")',
    backgroundSize: 'auto 70%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '80% 0',
    minHeight: '100vh',
    margin: '0 auto',
  },
  title: {
    fontSize: '100px',
    letterSpacing: '1.2px',
    lineHeight: '120px',
    fontWeight: 600,
    color: '#000',
    fontFamily: '"CT Cinetype"',
  },
  titleSecond: {
    color: '#0B24FA'
  },
  content: {
    container: {
      paddingTop: '50px',
      margin: '0 auto',
    },
  },
  buttons: {
    container: {
      display: 'flex',
      paddingTop: '30px',
    },
    button: {
      marginTop: '-4px',
      background: 'none',
      border: '3px solid #000',
      padding: '18px 20px',
      color: '#000',
      marginRight: '20px',
      fontFamily: '"CT Cinetype"',
      fontSize: '19px',
      letterSpacing: '1px',
      // textTransform: 'uppercase',
      fontWeight: 600,
    },
  },
};
