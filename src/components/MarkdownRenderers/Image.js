import React, { Component } from 'react';
import _ from 'lodash';
import windowSize from 'react-window-size';
import { compose } from 'redux';

import imageUrl from '../../theme/imageUrl';
import Text from '../Text';

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
    const {
      alt,
    } = this.props;

    return (
      <div style={styles.container}>
        <img alt={alt} {...this.props} src={this.src()} style={styles.img} />
        <Text grey>
          {alt}
        </Text>
      </div>
    );
  }
}

const styles = {
  img: {
    width: '100%',
  },
};

export default compose(
  windowSize,
)(MarkdownRendererImage);
