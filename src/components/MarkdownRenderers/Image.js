import React, { Component } from 'react';

export default class MarkdownRendererImage extends Component {
  render() {
    return <img alt='' {...this.props} style={styles.container} />;
  }
}

const styles = {
  container: {
    width: '100%',
  },
};
