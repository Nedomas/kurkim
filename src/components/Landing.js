import React, { Component } from 'react';

import Splash from './Splash';

export default class Landing extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Splash />
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 auto',
  },
}
