import React, { Component } from 'react';

import step from '@bloometry/step';
import colors from '../../theme/colors';

export default class MarkdownRendererParagraph extends Component {
  render() {
    const {
      children,
      ...rest,
    } = this.props;

    return (
      <p style={styles.container} {...rest}>
        {children}
      </p>
    );
  }
}

const styles = {
  container: {
    paddingTop: step(),
  },
};
