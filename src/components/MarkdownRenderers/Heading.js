import React, { Component } from 'react';

import step from '@bloometry/step';
import colors from '../../theme/colors';

import Headline from '../Headline';

export default class MarkdownRendererHeading extends Component {
  render() {
    const {
      children,
      ...rest,
    } = this.props;
    console.log(this.props);

    return (
      <Headline style={styles.container} {...rest}>
        {children}
      </Headline>
    );
  }
}

const styles = {
  container: {
  },
};
