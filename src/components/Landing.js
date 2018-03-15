import React, { Component } from 'react';

import Splash from './Splash';
import Cards from './Cards';
import Footer from './Footer';

export default class Landing extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Splash {...this.props} />
        <Cards {...this.props} />
        <Footer {...this.props} />
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 auto',
  },
}
