import React, { Component } from 'react';

import colors from '../../theme/colors';

export default class MarkdownRendererLink extends Component {
  render() {
    const {
      children,
      ...rest,
    } = this.props;

    return <a style={styles.container} {...rest}>{children}</a>;
  }
}

const styles = {
  container: {
    color: colors.black,
  },
};
