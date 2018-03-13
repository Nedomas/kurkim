import React, { Component } from 'react';

import step from '@bloometry/step';
import colors from '../../theme/colors';

export default class MarkdownRendererList extends Component {
  render() {
    const {
      children,
      ordered: _ordered,
      tight: _tight,
      ...rest,
    } = this.props;

    return (
      <ul style={styles.container} {...rest}>
        {children}
      </ul>
    );
  }
}

const styles = {
  container: {
    padding: `${step(0.2)} 0`,
  },
};
