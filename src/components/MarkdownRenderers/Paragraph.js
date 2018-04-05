import React, { Component } from 'react';

import Text from '../Text';

export default class MarkdownRendererParagraph extends Component {
  render() {
    const {
      children,
      ...rest,
    } = this.props;

    return (
      <Text level={2} padBottom={2} {...rest}>
        {children}
      </Text>
    );
  }
}
