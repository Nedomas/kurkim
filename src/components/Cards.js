import React, { Component } from 'react';
import _ from 'lodash';
import Radium from 'radium';
import { connect } from 'react-redux';
import windowSize from 'react-window-size';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';

import Card from './Card';

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

    if (loading) return <div/>;
    console.log(this.all());

    return (
      <div style={[styles.container, small && styles.small.container]} id='cards'>
        <div style={styles.innerContainer}>
          <div style={styles.filters.container}>
            <a href='/#cards' style={styles.filters.item}>
              Visi
            </a>
            <a href='/events#cards' style={styles.filters.item}>
              Renginiai
            </a>
            <a href='/jobs#cards' style={styles.filters.item}>
              Darbo skelbimai
            </a>
          </div>
          <div style={styles.list}>
              {_.map(this.all(), (data) => <Card key={data.id} data={data} />)}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  innerContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  container: {
    padding: '100px 80px',
  },
  title: {
    fontFamily: 'Apercu Pro',
    fontSize: '70px',
    letterSpacing: '1.2px',
    color: '#000',
  },
  titleDash: {
    color: '#FBD230',
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: '0 -15px',
  },
  filters: {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: '55px',
    },
    item: {
      marginRight: '20px',
      color: '#312E3F',
      // fontWeight: 600,
      fontSize: '13px',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      display: 'block',
      textDecoration: 'none',
      paddingBottom: '4px',
      borderBottom: '1px solid hsla(251, 16%, 21%, 0.1)',
    },
  },
  small: {
    container: {
      padding: '100px 40px',
    },
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
    }
  }
`;

export default compose(
  graphql(CardsQuery),
  windowSize,
  Radium,
)(Cards);
