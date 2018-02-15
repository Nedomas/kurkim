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

          <div style={styles.buttons.container}>
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
    backgroundImage: 'url("/new4.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'top',
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
      padding: '150px 80px 0',
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
      background: 'hsla(229, 47%, 47%, .5)',
      // borderBottom: '1px solid hsla(0, 0%, 100%, .5)',
      padding: '10px',
      borderRadius: '5px',
      color: '#fff',
      marginRight: '40px',
      fontSize: '15px',
      letterSpacing: '1px',
      display: 'block',
      textDecoration: 'none',
      textTransform: 'uppercase',

      ':hover': {
        background: 'hsla(229, 47%, 47%, .8)',
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
  },
  big: {
    title: {
      fontSize: '100px',
      letterSpacing: '-1.5px',
      lineHeight: '95px',
    },
  },
};
