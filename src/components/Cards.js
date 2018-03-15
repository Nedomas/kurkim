import React, { Component } from 'react';
import _ from 'lodash';
import Radium from 'radium';
import { connect } from 'react-redux';
import windowSize from 'react-window-size';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';
import StackGrid from 'react-stack-grid';

import step from '@bloometry/step';
import colors from '../theme/colors';
import Card from './Card';
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
      filter,
    } = this.props;

    const result = _.compact(_.flatten(_.map(COLLECTIONS, (collection) => data[collection])));

    if (!filter) return result;

    return _.filter(result, {
      __typename: _.capitalize(filter)
    });
  }

  render() {
    const {
      data: {
        loading,
      },
    } = this.props;

    const small = this.props.windowWidth <= 768;

    if (loading) return <FullScreenLoading />;

    return (
      <Container style={styles.container}>
        <Headline center tier={2}>
          Naujausi kūrybingo darbo skelbimai
        </Headline>
        <div style={styles.filters.container}>
          <Button active tiny transparent style={styles.filters.button}>
            Visi
          </Button>
          <Button tiny transparent style={styles.filters.button}>
            Vilnius
          </Button>
          <Button tiny transparent style={styles.filters.button}>
            Kaunas
          </Button>
        </div>
        <StackGrid
          columnWidth={300}
          gutterWidth={20}
          gutterHeight={20}
        >
          {_.map(this.all(), (data, i) => <Card key={data.id} data={data}/>)}
        </StackGrid>
      </Container>
    );
  }
}

const styles = {
  container: {
    padding: `${step(4)} 0`,
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
