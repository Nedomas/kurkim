import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';

import step from '@bloometry/step';
import borders from '../theme/borders';
import borderRadius from '../theme/borderRadius';
import Container from './Container';

class Input extends Component {
  render() {
    const {
      meta: {
        touched,
        error,
      },
      hideError,
    } = this.props;

    return <Container {...this.props.input} pad={1} component='input' {...this.props} style={[
        styles.input,
        this.props.style,
        !hideError && touched && error && styles.error
      ]}
    />;
  }
};

const styles = {
  input: {
    outline: 0,
    border: borders.grey,
    borderRadius,
    width: `calc(100% - ${step(2)})`,

    ':focus': {
      border: borders.yellow,
    },
  },
  error: {
    border: borders.red,
  },
};

export default compose(
  Radium,
)(Input);
