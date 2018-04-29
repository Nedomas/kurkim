import React, { Component } from 'react';
import Radium from 'radium';
import windowSize from 'react-window-size';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import ReactSimpleRange from 'react-simple-range';
import { Helmet } from 'react-helmet';

import step from '@bloometry/step';
import colors from '../theme/colors';
import isSmall from '../theme/isSmall';

import formatJobHeadline from '../helpers/formatJobHeadline';

import Cities from './Cities';
import PrimaryJobButton from './PrimaryJobButton';
import SecondaryJobButtons from './SecondaryJobButtons';
import FullScreenLoading from './FullScreenLoading';
import Navbar from './Navbar';
import Container from './Container';
import Headline from './Headline';
import Text from './Text';
import Markdown from './Markdown';
import Footer from './Footer';
import CompanyLogoWithBorder from './CompanyLogoWithBorder';
import ScrollToTop from './ScrollToTop';

import maxReadableWidth from '../theme/maxReadableWidth';
import imageUrl from '../theme/imageUrl';

class Job extends Component {
  logoBackgroundColor() {
    const {
      data: {
        Job: {
          company: {
            logoBackgroundColor,
          },
        },
      },
    } = this.props;

    if (!logoBackgroundColor) return colors.white;

    return `rgba(${_.values(JSON.parse(logoBackgroundColor)).join(', ')})`;
  }

  formatTime(time) {
    return moment(time).format('YYYY-MM-DD');
  }

  activeFrom() {
    const {
      activeFrom,
      createdAt,
    } = this.job();

    return activeFrom || createdAt;
  }

  isActive() {
    const {
      activeUntil,
    } = this.job();

    return moment().isSameOrBefore(activeUntil);
  }

  job() {
    const {
      data: {
        allJobs,
      },
    } = this.props;

    return _.first(allJobs);
  }

  render() {
    const {
      data: {
        loading,
      },
    } = this.props;

    if (loading) return <FullScreenLoading />;

    const {
      headline,
      teaser,
      description,
      cities,
      activeUntil,
      company,
      company: {
        name,
        displayImage,
      },
    } = this.job();

    return (
      <div>
        <ScrollToTop />
        <Helmet>
          <title>
            {formatJobHeadline(headline)} @ {name}
          </title>
          <meta name='description' content={teaser} />

          <meta property='og:title' content={`${formatJobHeadline(headline)} @ ${name}`} />
          <meta property='og:description' content={teaser} />
          <meta property='og:image' content={imageUrl(displayImage, { ogImage: true })} />
        </Helmet>

        <Navbar dark />

        <Container pad padNavbar style={[styles.container, isSmall(this) && styles.small.container]}>
          <div style={[styles.company.container, isSmall(this) && styles.small.company.container]}>
            <CompanyLogoWithBorder company={company} />
            <Headline center medium level={3}>
              {isSmall(this) && `${formatJobHeadline(headline)} @ `} {name}
            </Headline>
            {isSmall(this) && <Cities cities={cities} padTop padBottom center/>}

            <div style={styles.active.container}>
              <Text center>
                Pozicija {this.isActive() ? 'aktyvi' : 'nebeaktyvi'}
              </Text>

              <div style={styles.active.range}>
                <ReactSimpleRange
                  trackColor={this.isActive() ? colors.black : colors.red}
                  thumbColor={colors.red}
                  sliderColor={colors.lightLightBlack}
                  disableThumb
                  value={this.isActive() ? moment().valueOf() : moment(activeUntil).valueOf()}
                  sliderSize={2}
                  min={moment(this.activeFrom()).valueOf()}
                  max={moment(activeUntil).valueOf()}
                />
              </div>
              <Container style={styles.labels.container}>
                <Text>
                  {this.formatTime(this.activeFrom())}
                </Text>
                <Text>
                  {this.formatTime(activeUntil)}
                </Text>
              </Container>
            </div>

            <Container padBottom={isSmall(this)}>
              <PrimaryJobButton job={this.job()} />
              {!isSmall(this) && <SecondaryJobButtons job={this.job()} />}
            </Container>
          </div>

          <div style={[styles.content.container, isSmall(this) && styles.small.content.container]}>
            {!isSmall(this) && <Headline bold level={2} padBottom>
              {formatJobHeadline(headline)}
            </Headline>}
            {!isSmall(this) && <Cities cities={cities} padBottom/>}
            <Container padTop={isSmall(this)} justify>
              <Markdown source={description} />
            </Container>

            {isSmall(this) && <Container>
              <PrimaryJobButton job={this.job()} />
              <SecondaryJobButtons job={this.job()} />
            </Container>}
          </div>
        </Container>

        <Footer {...this.props} marginTop={8} />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
  },
  company: {
    container: {
      width: '30%',
      marginRight: step(5),
    },
    city: {
      padding: `${step(0.2)} 0 ${step()}`,
    },
  },
  content: {
    container: {
      width: '70%',
      maxWidth: maxReadableWidth,
    },
  },
  secondaryButton: {
    marginTop: step(),
  },
  labels: {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  active: {
    container: {
      padding: `${step(2)} 0`,
    },
    range: {
      pointerEvents: 'none',
    },
  },
  small: {
    container: {
      display: 'block',
    },
    company: {
      container: {
        width: '100%',
      },
    },
    content: {
      container: {
        width: '100%',
      },
    },
  },
};

const JobQuery = gql`
  query JobQuery($companySlug: String!, $jobSlug: String!, $isPublished: Boolean!, $today: DateTime!) {
    allJobs(filter: {
      slug: $jobSlug,
      company: {
        slug: $companySlug,
      },
    }) {
      id
      headline
      teaser
      description
      activeFrom
      activeUntil
      applyLink
      createdAt

      cities {
        name
      }

      company {
        name
        slug
        logo {
          handle
        }
        displayImage {
          handle
        }
        logoBackgroundColor

        _jobsMeta(
          filter: {
            isPublished: $isPublished,
            activeUntil_gte: $today,
          }
        ) {
          count
        }
      }
    }
  }
`;

export default compose(
  graphql(JobQuery, {
    options: ({
      location: {
        search,
      },
      match: {
        params: {
          companySlug,
          jobSlug,
        },
      },
    }) => ({
      variables: {
        companySlug,
        jobSlug,
        isPublished: search !== '?unpublished',
        today: moment().toISOString(),
      },
    }),
  }),
  windowSize,
  Radium,
)(Job);
