import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

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

    return (
      <div style={styles.container} id='cards'>
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
    );
  }
}

const styles = {
  container: {
    padding: '100px 80px',
    margin: '0 auto',
    maxWidth: '1000px',
  },
  title: {
    fontFamily: '"Garamond Premier Pro Display"',
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
    flexWrap: 'wrap',
    margin: '0 -15px',
  },
  filters: {
    container: {
      display: 'flex',
      alignItems: 'center',
      paddingBottom: '55px',
    },
    item: {
      marginRight: '20px',
      color: '#312E3F',
      // fontWeight: 600,
      fontFamily: '"HK Grotesk"',
      fontSize: '13px',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      display: 'block',
      textDecoration: 'none',
      paddingBottom: '4px',
      borderBottom: '1px solid hsla(251, 16%, 21%, 0.1)',
    },
  },
}

export default connect(state => ({
  entries: state.entries,
}), {
  handleLoad: load,
})(Cards);
