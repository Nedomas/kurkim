import React, { Component } from 'react';
import _ from 'lodash';
import Radium from 'radium';
import windowSize from 'react-window-size';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';
import moment from 'moment';

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

  events() {
    const {
      data: {
        allEvents,
      },
    } = this.props;

    return this.addType(allEvents, 'event');
  }

  subscribes() {
    return [{ id: 'subscribe', type: 'subscribe' }];
  }

  all() {
    const result = _.compact(
      _.flatten(
        _.zip(
          _.times(1, _.constant(null)).concat(this.events()),
          _.times(3, _.constant(null)).concat(this.blogPosts()),
          this.jobs(),
          _.times(2, _.constant(null)).concat(this.subscribes()),
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
  query LandingCardsQuery($isPublished: Boolean!, $today: DateTime!) {
    allCities {
      id
      name

      _jobsMeta(
        filter: {
          activeUntil_gte: $today,
          isPublished: $isPublished,
        }
      ) {
        count
      }
    }

    allEvents(filter: {
      isPublished: $isPublished,
    },
    orderBy: publishedAt_DESC) {
      id
      headline
      publishedAt
      rsvpLink
      startTime
      endTime

      cities {
        id
        name
      }

      displayImage {
        handle
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

    allJobs(
      orderBy: activeFrom_DESC
      filter: {
        activeUntil_gte: $today,
        isPublished: $isPublished,
      }
    ) {
      id
      headline
      teaser
      slug

      cities {
        id
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
        today: moment().toISOString(),
      },
    }),
  }),
  windowSize,
  Radium,
)(LandingCards);
