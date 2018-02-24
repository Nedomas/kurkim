import React, { Component } from 'react';

import Splash from './Splash';
import Cards from './Cards';

export default class Landing extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Splash />
        <Cards />
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 auto',
  },
}
