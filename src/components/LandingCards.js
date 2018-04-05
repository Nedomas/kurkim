import React, { Component } from 'react';
import _ from 'lodash';
import Radium from 'radium';
import windowSize from 'react-window-size';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';

import isSmall from '../theme/isSmall';
import CardsGrid from './CardsGrid';
import Container from './Container';
import FullScreenLoading from './FullScreenLoading';
import Filters from './Filters';

class LandingCards extends Component {
  addType(elements, type) {
    return _.map(elements, (element) => ({ type, ...element }));
  }

  jobs() {
    const {
      data: {
        allJobs,
      },
    } = this.props;

    return this.addType(allJobs, 'job');
  }

  blogPosts() {
    const {
      data: {
        allBlogPosts,
      },
    } = this.props;

    return this.addType(allBlogPosts, 'blogPost');
  }

  subscribes() {
    return [{ id: 'subscribe', type: 'subscribe' }];
  }

  all() {
    const result = _.compact(
      _.flatten(
        _.zip(
          this.jobs(),
          _.times(2, _.constant(null)).concat(this.subscribes()),
          _.times(3, _.constant(null)).concat(this.blogPosts()),
        )
      )
    );

    return this.filter(result);
  }

  filter(all) {
    const {
      match: {
        params: {
          city,
        },
      },
    } = this.props;

    if (!city) return all;

    return _.filter(all, (job) => {
      return _.some(job.cities, { name: city });
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
        {!isSmall(this) && <Filters {...this.props} cities={allCities} />}
        <CardsGrid cards={this.all()} />
      </Container>
    );
  }
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
    orderBy: publishedAt_DESC) {
      id
      slug
      headline
      cardTeaser
      publishedAt
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
        lightAvatar {
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
