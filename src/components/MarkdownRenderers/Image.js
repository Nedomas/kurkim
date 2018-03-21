import React, { Component } from 'react';
import _ from 'lodash';
import windowSize from 'react-window-size';
import { compose } from 'redux';

import imageUrl from '../../theme/imageUrl';

class MarkdownRendererImage extends Component {
  isGraphCmsImage() {
    return this.props.src.match(/media\.graphcms\.com/);
  }

  imageHandle() {
    return _.last(this.props.src.split('/'));
  }

  src() {
    if (!this.isGraphCmsImage()) return this.props.src;

    return imageUrl({ handle: this.imageHandle() }, { width: _.min([940, this.props.windowWidth]) });
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

export default compose(
  windowSize,
)(MarkdownRendererImage);
