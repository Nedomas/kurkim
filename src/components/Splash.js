import React, { Component } from 'react';
import Radium from 'radium';
import Navbar from './Navbar';
import windowSize from 'react-window-size';

class Splash extends Component {
  render() {
    const small = this.props.windowWidth <= 768;
    const big = this.props.windowWidth > 1300;

    return (
      <div style={styles.container}>
        <Navbar />

        <div style={[styles.content.container, small && styles.small.content.container]}>
          <div style={[styles.title, small && styles.small.title, big && styles.big.title]}>
            <div>
              Kūrybingi darbai
            </div>
            <div style={styles.titleSecond}>
              kūrybingiems
            </div>
          </div>

          <div style={[styles.buttons.container, small && styles.small.buttons.container]}>
            <a href='https://vaida6.typeform.com/to/Zuo2lo' target='_blank' style={styles.buttons.button} key='company'>
              Ieškoti kūrybingų
            </a>

            <a href='https://vaida6.typeform.com/to/Mwj5Y8' target='_blank' style={styles.buttons.button} key='person'>
              Esu kūrybingas
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default windowSize(Radium(Splash));

const styles = {
  container: {
    backgroundImage: 'url("/splash.png")',
    backgroundSize: '400px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50vw 25vh',
    backgroundColor: '#F96D6F',
    minHeight: '100vh',
    margin: '0 auto',
    width: '100%',
  },
  title: {
    fontSize: '80px',
    letterSpacing: '-2.5px',
    lineHeight: '75px',
    color: '#fff',
    fontFamily: 'Apercu Pro',
  },
  titleSecond: {
    // color: '#0B24FA'
  },
  content: {
    container: {
      padding: '20vh 80px 0',
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
      // background: 'hsla(229, 47%, 47%, .5)',
      // borderBottom: '1px solid hsla(0, 0%, 100%, .5)',
      border: '2px solid #fff',
      padding: '10px 20px',
      // borderRadius: '5px',
      color: '#fff',
      margin: '0 40px 10px 0',
      fontSize: '18px',
      letterSpacing: '1px',
      display: 'block',
      textDecoration: 'none',
      textTransform: 'uppercase',

      ':hover': {
        background: 'hsla(0, 0%, 0%, .05)',
      },
    },
  },
  small: {
    title: {
      fontSize: '40px',
      letterSpacing: '-1px',
      lineHeight: '35px',
    },
    content: {
      container: {
        padding: '150px 40px 0',
      },
    },
    buttons: {
      container: {
        display: 'block',
      },
    },
  },
  big: {
    title: {
      fontSize: '100px',
      letterSpacing: '-1.5px',
      lineHeight: '95px',
    },
  },
};
