import React, { Component } from 'react';

import Cards from './Cards';
import Splash from './Splash';

export default class People extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Splash />
        <Cards filter='person' />
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 auto',
  },
}
