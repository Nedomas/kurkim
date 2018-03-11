import React, { Component } from 'react';
import _ from 'lodash';
import Radium from 'radium';
import { connect } from 'react-redux';
import windowSize from 'react-window-size';

import {
  load,
} from '../modules/entries';

import Card from './Card';

class Cards extends Component {
  componentDidMount() {
    this.props.handleLoad();
  }

  all() {
    const {
      entries: {
        all,
      },
      filter,
    } = this.props;

    const jobs = _.filter(all, {
      sys: {
        contentType: {
          sys: {
            id: 'job'
          }
        }
      }
    });

    const events = _.filter(all, {
      sys: {
        contentType: {
          sys: {
            id: 'event'
          }
        }
      }
    });

    const people = _.filter(all, {
      sys: {
        contentType: {
          sys: {
            id: 'person'
          }
        }
      }
    });

    const result = _.compact(_.flatten(_.zip(jobs, events, people)));
    if (!filter) return result;

    return _.filter(all, {
      sys: {
        contentType: {
          sys: {
            id: filter
          }
        }
      }
    });
  }

  render() {
    const {
      entries: {
        includes,
      },
    } = this.props;
    const small = this.props.windowWidth <= 768;

    return (
      <div style={[styles.container, small && styles.small.container]} id='cards'>
        <div style={styles.innerContainer}>
          <div style={styles.filters.container}>
            <a href='/#cards' style={styles.filters.item}>
              Visi
            </a>
            <a href='/people#cards' style={styles.filters.item}>
              Žmonės
            </a>
            <a href='/events#cards' style={styles.filters.item}>
              Renginiai
            </a>
            <a href='/jobs#cards' style={styles.filters.item}>
              Darbo skelbimai
            </a>
          </div>
          <div style={styles.list}>
              {_.map(this.all(), (entry) => <Card key={entry.sys.id} data={entry} includes={includes} />)}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  innerContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  container: {
    // backgroundImage: 'url("/bg2.jpg")',
    // backgroundSize: '400px',
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: '70vw 0px',
    padding: '100px 80px',
  },
  title: {
    fontFamily: 'Apercu Pro',
    fontSize: '70px',
    letterSpacing: '1.2px',
    // fontWeight: 600,
    color: '#000',
  },
  titleDash: {
    color: '#FBD230',
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: '0 -15px',
  },
  filters: {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: '55px',
    },
    item: {
      marginRight: '20px',
      color: '#312E3F',
      // fontWeight: 600,
      fontSize: '13px',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      display: 'block',
      textDecoration: 'none',
      paddingBottom: '4px',
      borderBottom: '1px solid hsla(251, 16%, 21%, 0.1)',
    },
  },
  small: {
    container: {
      padding: '100px 40px',
    },
  },
}

export default connect(state => ({
  entries: state.entries,
}), {
  handleLoad: load,
})(windowSize(Radium(Cards)));
