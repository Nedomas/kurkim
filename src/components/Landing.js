import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import {
  load,
} from '../modules/entries';

import Card from './Card';
import Splash from './Splash';

class Landing extends Component {
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
      <div style={styles.container}>
        <Splash />

        <div style={styles.cards.container}>
          <div style={styles.cards.list}>
            {_.map(all, (entry) => <Card key={entry.sys.id} data={entry} includes={includes} />)}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 auto',
    // padding: '40px',
  },
  cards: {
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
  },
}

export default connect(state => ({
  entries: state.entries,
}), {
  handleLoad: load,
})(Landing);
