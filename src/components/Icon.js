import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';

import fluid from '@bloometry/fluid';
import colors from '../theme/colors';

import { ReactComponent as city } from '../assets/city.svg';

const TYPES = {
  city,
};

class Icon extends Component {
  render() {
    const {
      type,
      tiny,
      style,
    } = this.props;

    const TagName = Radium(TYPES[type]);

    return (
      <TagName style={[
        styles.container,
        tiny && styles.tiny,
        style,
      ]} />
    );
  }
};

const styles = {
  container: {
    width: fluid(70, 100),
    height: fluid(70, 100),
    fill: colors.black,
  },
  tiny: {
    width: fluid(16, 20),
    height: fluid(16, 20),
  },
};

export default compose(
  Radium,
)(Icon);
