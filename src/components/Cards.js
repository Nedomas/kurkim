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
import isSmall from '../theme/isSmall';
import CardsGrid from './CardsGrid';
import Button from './Button';
import Headline from './Headline';
import Container from './Container';
import FullScreenLoading from './FullScreenLoading';
import Filters from './Filters';

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

  render() {
    const {
      data: {
        loading,
        allCities,
      },
    } = this.props;

    if (loading) return <FullScreenLoading />;

    return (
      <Container pad padTop={4}>
        <Filters {...this.props} cities={allCities} />
        <CardsGrid cards={this.all()} />
      </Container>
    );
  }
}

const styles = {
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
      slug

      cities {
        name
      }

      company {
        name
        slug
        logo {
          handle
        }
        logoBackgroundColor
        displayImage {
          handle
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
