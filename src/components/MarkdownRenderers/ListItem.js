import React, { Component } from 'react';

import step from '@bloometry/step';
import Text from '../Text';
import Container from '../Container';

export default class MarkdownRendererListItem extends Component {
  render() {
    const {
      children,
      ordered: _ordered,
      tight: _tight,
      ...rest,
    } = this.props;

    const childrenWithProps = React.Children.map(children, (child) => {
      return (
        <Text level={2} tight style={styles.childText} {...rest}>
          {child}
        </Text>
      );
    });

    return (
      <Container padBottom={0.7} component='li' style={styles.container} {...rest}>
        <img alt='o' style={styles.bulletpoint} src='/oval-yellow.svg'/>
        {childrenWithProps}
      </Container>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  bulletpoint: {
    height: step(0.7),
    paddingRight: step(0.5),
  },
  childText: {
    padding: `0 ${step(0.1)}`,
  },
};
