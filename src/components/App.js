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
                Chilli
                <br/>
                Con Arte
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

            <div style={styles.header.content.container}>
              <div>
                <div style={styles.header.title}>
                  <div>
                    Kūrybingi darbai
                  </div>
                  <div style={styles.header.titleSecond}>
                    kūrybingiems
                  </div>
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

        </div>

        <div style={styles.inner}>
          <div style={styles.cards.title}>
            Naujausi <span style={styles.cards.titleDash}>-</span>
          </div>

          <div style={styles.cards.list}>
            {_.map(_.shuffle(all.concat(all)), (entry) => <Card key={entry.sys.id} data={entry} includes={includes} />)}
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
    // width: '800px',
    margin: '0 auto',
    padding: '40px',
  },
  cards: {
    title: {
      fontSize: '70px',
      letterSpacing: '1.2px',
      fontWeight: 600,
      color: '#000',
    },
    titleDash: {
      color: '#FBD230',
    },
    list: {
      display: 'flex',
      padding: '50px 0',
      margin: '0 -10px',
      flexWrap: 'wrap',
      // justifyContent: 'center',
    },
  },
  header: {
    container: {
      backgroundImage: 'url("/art2.jpg")',
      backgroundSize: 'auto 70%',
      backgroundRepeat: 'no-repeat',
      // backgroundSize: 'cover',
      backgroundPosition: '75% 50%',
      // backgroundColor: '#F7FDF4',
      minHeight: '115vh',
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
        paddingTop: '100px',
        // width: '800px',
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
  },
  navbar: {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontWeight: 600,
      fontSize: '25px',
      lineHeight: '30px',
      color: '#000',
      textTransform: 'uppercase',
      fontFamily: '"CT Cinetype"',
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
      },
      button: {
        marginTop: '-4px',
        background: 'none',
        border: '3px solid #000',
        padding: '13px 20px',
        color: '#000',
        fontWeight: 600,
      },
    },
  },
}

export default connect(state => ({
  entries: state.entries,
}), {
  handleLoad: load,
})(App);
