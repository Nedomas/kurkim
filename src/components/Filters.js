import React, { Component } from 'react';
import _ from 'lodash';
import Radium from 'radium';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import step from '@bloometry/step';
import isSmall from '../theme/isSmall';
import Button from './Button';
import Container from './Container';

class Filters extends Component {
  isActive(city) {
    const {
      data,
      match: {
        params: {
          city: filterCityName,
        },
      },
    } = this.props;

    if (!city && !filterCityName) return true;
    if (city && city.name === filterCityName) return true;

    return false;
  }

  render() {
    const {
      cities,
    } = this.props;

    return (
      <Container padBottom={2} style={styles.container}>
        <Button component={Link} to='/' active={this.isActive()} tiny transparent style={styles.button}>
          Visi
        </Button>
        {_.map(cities, (city) => (
          <Button key={city.id} active={this.isActive(city)} component={Link} to={`/miestai/${city.name}`} tiny transparent style={styles.button}>
            {city.name} {!isSmall(this) && ` (${city._jobsMeta.count})`}
          </Button>
        ))}
      </Container>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: `0 ${step()}`,
    width: '100px',
  },
}

export default compose(
  Radium,
)(Filters);
