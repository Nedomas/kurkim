import React, { Component } from 'react';
import Radium from 'radium';
import { compose } from 'redux';
import track from '../helpers/track';

import Button from './Button';

class PrimaryJobButton extends Component {
  render() {
    const {
      job,
      job: {
        applyLink,
      },
    } = this.props;

    return (
      <Button component='a' href={applyLink} target='_blank' onClick={() => track('Apply To Job Clicked', job) }>
        Aplikuoti
      </Button>
    );
  }
}

export default compose(
  Radium,
)(PrimaryJobButton);
