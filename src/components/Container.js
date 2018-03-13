import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';

import fluid from '@bloometry/fluid';
import step from '@bloometry/step';

class Container extends Component {
  render() {
    const {
      style,
      children,
    } = this.props;

    return (
      <div style={[styles.container, style]}>
        {children}
      </div>
    );
  }
};

const styles = {
  container: {
    padding: step(1.5),
  },
};

export default compose(
  Radium,
)(Container);
