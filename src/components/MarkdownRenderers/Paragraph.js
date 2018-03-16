import React, { Component } from 'react';

import step from '@bloometry/step';
import colors from '../../theme/colors';

import Text from '../Text';

export default class MarkdownRendererParagraph extends Component {
  render() {
    const {
      children,
      ...rest,
    } = this.props;

    return (
      <Text padBottom={2} {...rest}>
        {children}
      </Text>
    );
  }
}
