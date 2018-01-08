import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import {
  load,
} from '../modules/entries';

import Card from './Card';

class App extends Component {
  componentDidMount() {
    this.props.handleLoad();
  }

  render() {
    const {
      entries: {
        all,
        includes,
      },
    } = this.props;

    return (
      <div style={styles.main}>
        <div style={styles.header.container}>
          <div style={styles.inner}>
            <div style={styles.navbar.container}>
              <div style={styles.navbar.logo}>
                Chilli Con Arte
              </div>

              <div style={styles.navbar.links.container}>
                <div style={styles.navbar.links.item}>
                  Blogas
                </div>
                <div style={styles.navbar.links.item}>
                  <div style={styles.navbar.links.button}>
                    Įkelti skelbimą
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.header.content.container}>
            <div>
              <div style={styles.header.title}>
                Kūrybingi darbai
                <br />
                kūrybingiems
              </div>

              <div style={styles.header.buttons.container}>
                <button style={styles.header.buttons.button}>
                  Įkelti darbo skelbimą
                </button>

                <button style={styles.header.buttons.button}>
                  Esu kūrybingas
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.inner}>
          <div style={styles.cards}>
            {_.map(all, (entry) => <Card key={entry.sys.id} data={entry} includes={includes} />)}
          </div>
        </div>
      </div>
    );
  }
}


//            <div style={styles.header.people.container}>
//             <img src='/IMG_3059.JPG' style={styles.header.people.img} />
//           </div>
const styles = {
  main: {
    height: "100vh",
  },
  inner: {
    width: '800px',
    margin: '0 auto',
  },
  cards: {
    display: 'flex',
    padding: '100px 0',
    margin: '0 -10px',
  },
  header: {
    container: {
      backgroundImage: 'url("/chilli.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center bottom',
      minHeight: '115vh',
    },
    title: {
      fontSize: '40px',
      fontWeight: 600,
      color: '#fff',
    },
    content: {
      container: {
        paddingTop: '100px',
        width: '800px',
        margin: '0 auto',
      },
    },
    people: {
      container: {
        width: '40%',
      },
      img: {
        width: '100%',
      },
    },
    buttons: {
      container: {
        display: 'flex',
        paddingTop: '30px',
      },
      button: {
        backgroundColor: 'hsla(0, 0%, 100%, 0.9)',
        border: 'none',
        color: '#000',
        padding: '20px',
        fontSize: '14px',
        fontWeight: 600,
        textTransform: 'uppercase',
        borderRadius: '4px',
        marginRight: '20px',
      },
    },
  },
  navbar: {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '30px 0',
    },
    logo: {
      fontWeight: 600,
      fontSize: '20px',
      color: '#fff',
    },
    links: {
      container: {
        display: 'flex',
        alignItems: 'center',
      },
      item: {
        paddingLeft: '30px',
        color: '#fff',
        fontWeight: 600,
      },
      button: {
        backgroundColor: '#EC4033',
        padding: '10px',
        color: '#fff',
        fontWeight: 600,
        fontSize: '12px',
        borderRadius: '3px',
        textTransform: 'uppercase',
      },
    },
  },
}

export default connect(state => ({
  entries: state.entries,
}), {
  handleLoad: load,
})(App);
