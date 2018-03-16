import React, { Component } from 'react';
import Radium from 'radium';
import { compose } from 'redux';

import Button from './Button';

class PrimaryJobButton extends Component {
  render() {
    const {
      job: {
        applyLink,
      },
    } = this.props;

    return (
      <Button component='a' href={applyLink} target='_blank'>
        Aplikuoti
      </Button>
    );
  }
}

export default compose(
  Radium,
)(PrimaryJobButton);
