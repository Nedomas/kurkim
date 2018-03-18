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

class LandingCards extends Component {
  jobs() {
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

  blogPosts() {
    const {
      data: {
        allBlogPosts,
      },
    } = this.props;

    return _.map(allBlogPosts, (blogPost) => ({ type: 'blogPost', ...blogPost }));
  }

  all() {
    const jobs = _.map(this.jobs(), (job) => ({ type: 'job', ...job }));

    const set = (n, ins, arr) => [...arr.slice(0, n), ins, ...arr.slice(n)];
    const result = set(3, { type: 'subscribe' }, jobs);
    return _.shuffle(result.concat(this.blogPosts()));
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

const LandingCardsQuery = gql`
  query LandingCardsQuery($isPublished: Boolean!) {
    allCities {
      id
      name

      _jobsMeta {
        count
      }
    }

    allBlogPosts(filter: {
      isPublished: $isPublished,
    },
    orderBy: createdAt_DESC) {
      id
      slug
      headline
      teaser
      createdAt
      timeToRead
      displayImage {
        handle
      }

      author {
        fullName
        title
        avatarOnly
        avatar {
          handle
        }
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
  graphql(LandingCardsQuery, {
    options: ({
      location: {
        search,
      },
    }) => ({
      variables: {
        isPublished: search !== '?unpublished',
      },
    }),
  }),
  windowSize,
  Radium,
)(LandingCards);
