import React, { Component } from 'react';
import _ from 'lodash';

import imageUrl from '../../theme/imageUrl';

export default class MarkdownRendererImage extends Component {
  isGraphCmsImage() {
    return this.props.src.match(/media\.graphcms\.com/);
  }

  imageHandle() {
    return _.last(this.props.src.split('/'));
  }

  src() {
    if (!this.isGraphCmsImage()) return this.props.src;

    return imageUrl({ handle: this.imageHandle() }, { width: 940 });
  }

  render() {
    return <img alt='' {...this.props} src={this.src()} style={styles.container} />;
  }
}

const styles = {
  container: {
    width: '100%',
  },
};
