import React, { Component } from 'react';

import Text from '../Text';

export default class MarkdownRendererBlockquote extends Component {
  render() {
    const {
      children,
      ...rest,
    } = this.props;

    const childrenWithProps = React.Children.map(children, (child) => {
      return React.cloneElement(child, { ...rest, level: 3, medium: true });
    });

    return (
      <Text pad {...rest}>
        {childrenWithProps}
      </Text>
    );
  }
}
