import React, { Component } from 'react';
import Radium from 'radium';
import { compose } from 'redux';
import _ from 'lodash';

import step from '@bloometry/step';

import Container from './Container';
import Icon from './Icon';
import Text from './Text';

class Cities extends Component {
  render() {
    const {
      cities,
    } = this.props;

    if (!cities.length) return null;

    return (
      <Container {...this.props}>
        <Text {...this.props} level={2}>
          <Icon type='city' tiny />
          <span style={styles.text}>
            {_.uniq(_.map(cities, 'name')).join(', ')}
          </span>
        </Text>
      </Container>
    );
  }
}

const styles = {
  text: {
    paddingLeft: step(0.5),
  },
};

export default compose(
  Radium,
)(Cities);
