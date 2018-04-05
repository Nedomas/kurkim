import React, { Component } from 'react';

import Container from '../Container';

export default class MarkdownRendererList extends Component {
  render() {
    const {
      children,
      ordered: _ordered,
      tight: _tight,
      ...rest,
    } = this.props;

    return (
      <Container padBottom={2} style={styles.container} {...rest}>
        {children}
      </Container>
    );
  }
}

const styles = {
  container: {
    maxWidth: '650px',
  },
};
