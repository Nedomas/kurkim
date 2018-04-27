import React, { Component } from 'react';
import _ from 'lodash';
import Radium from 'radium';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import Dropdown, {
  DropdownTrigger,
  DropdownContent,
} from 'react-simple-dropdown';

import step from '@bloometry/step';
import isSmall from '../theme/isSmall';
import colors from '../theme/colors';
import Button from './Button';
import Container from './Container';
import Text from './Text';
import Icon from './Icon';

class Filters extends Component {
  isActive(city) {
    if (city && city.name === this.activeCityName()) return true;

    return false;
  }

  isAll() {
    return !this.activeCityName() && !this.props.eventsOnly;
  }

  activeCityName() {
    const {
      match: {
        params: {
          city,
        },
      },
    } = this.props;

    return city;
  }

  render() {
    const {
      cities,
      eventsOnly,
    } = this.props;

    return (
      <Container padBottom={2} style={styles.container}>
        <Button component={Link} to='/' active={this.isAll()} tiny transparent style={styles.button.container}>
          Visi
        </Button>

        <Button component={Link} to='/e' active={eventsOnly} tiny transparent style={styles.button.container}>
          Renginiai
        </Button>

        <Dropdown>
          <DropdownTrigger>
            <Button active={this.activeCityName()} tiny transparent style={styles.button.container}>
              {this.activeCityName() || 'Pozicijos'} <Icon type='dropdown' tiny style={styles.button.icon} />
            </Button>
          </DropdownTrigger>
          <DropdownContent>
            <Container style={styles.dropdown.container}>
              {_.map(cities, (city) => (
                <Text level={2} padBottom={0.5} component={Link} key={city.id} active={this.isActive(city)} to={`/miestai/${city.name}`} style={styles.dropdown.item}>
                  {city.name} {!isSmall(this) && ` (${city._jobsMeta.count})`}
                </Text>
              ))}
            </Container>
          </DropdownContent>
        </Dropdown>
        <Button component={Link} to='/t' tiny transparent style={styles.button.container}>
          Žurnalas
        </Button>
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
    container: {
      margin: `0 ${step()}`,
      minWidth: '100px',
      display: 'flex',
      alignItems: 'center',
      width: 'initial',
    },
    icon: {
      marginLeft: step(),
    },
  },
  dropdown: {
    container: {
      backgroundColor: colors.lightLightBlack,
      zIndex: 10,
      padding: `${step()} ${step()} ${step(0.5)}`,
    },
    item: {
      display: 'block',
      textDecoration: 'none',
      color: colors.black,

      ':hover': {
        color: colors.yellow,
      }
    },
  },
}

export default compose(
  Radium,
)(Filters);
