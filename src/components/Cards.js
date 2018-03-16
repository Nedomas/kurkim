import React, { Component } from 'react';
import _ from 'lodash';
import Radium from 'radium';
import { connect } from 'react-redux';
import windowSize from 'react-window-size';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';
import StackGrid from 'react-stack-grid';
import { Link } from 'react-router-dom';

import step from '@bloometry/step';
import colors from '../theme/colors';
import CardsGrid from './CardsGrid';
import Button from './Button';
import Headline from './Headline';
import Container from './Container';
import FullScreenLoading from './FullScreenLoading';

const COLLECTIONS = [
  'allJobs',
  'allEvents',
  'allPeople',
];

class Cards extends Component {
  all() {
    const {
      data,
      match: {
        params: {
          city: filterCityName,
        },
      },
    } = this.props;

    const result = _.compact(_.flatten(_.map(COLLECTIONS, (collection) => data[collection])));
    if (!filterCityName) return result;

    return _.filter(result, (job) => {
      return _.some(job.cities, { name: filterCityName });
    });
  }

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
      data: {
        loading,
        allCities,
      },
    } = this.props;

    if (loading) return <FullScreenLoading />;

    return (
      <Container style={styles.container}>
        <div style={styles.filters.container}>
          <Button component={Link} to='/' active={this.isActive()} tiny transparent style={styles.filters.button}>
            Visi
          </Button>
          {_.map(allCities, (city) => (
            <Button key={city.id} active={this.isActive(city)} component={Link} to={`/cities/${city.name}`} tiny transparent style={styles.filters.button}>
              {city.name} ({city._jobsMeta.count})
            </Button>
          ))}
        </div>

        <CardsGrid cards={this.all()} />
      </Container>
    );
  }
}

const styles = {
  container: {
    padding: `${step(4)} ${step(2)} 0`,
  },
  filters: {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: step(4),
    },
    button: {
      margin: `0 ${step()}`,
      width: '100px',
    },
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
    justifyContent: 'space-between',
  },
}

const CardsQuery = gql`
  query CardsQuery {
    allCities {
      id
      name

      _jobsMeta {
        count
      }
    }

    allJobs {
      id
      headline
      teaser

      cities {
        name
      }

      company {
        name
        logo {
          url
        }
        logoBackgroundColor
        displayImage {
          url
        }
      }
    }
  }
`;

export default compose(
  graphql(CardsQuery),
  windowSize,
  Radium,
)(Cards);
