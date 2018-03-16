import React, { Component } from 'react';

import step from '@bloometry/step';
import colors from '../../theme/colors';

import Text from '../Text';

export default class MarkdownRendererBlockquote extends Component {
  render() {
    const {
      children,
      ...rest,
    } = this.props;

    var childrenWithProps = React.Children.map(children, (child) => {
      return React.cloneElement(child, { ...rest, level: 2, medium: true });
    });

    return (
      <Text pad {...rest}>
        {childrenWithProps}
      </Text>
    );
  }
}
