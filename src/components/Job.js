import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import windowSize from 'react-window-size';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import ReactSimpleRange from 'react-simple-range';

import step from '@bloometry/step';
import colors from '../theme/colors';
import isSmall from '../theme/isSmall';

import Cities from './Cities';
import PrimaryJobButton from './PrimaryJobButton';
import SecondaryJobButtons from './SecondaryJobButtons';
import FullScreenLoading from './FullScreenLoading';
import Navbar from './Navbar';
import Icon from './Icon';
import Container from './Container';
import Headline from './Headline';
import Text from './Text';
import Button from './Button';
import FacebookShareButton from './FacebookShareButton';
import Markdown from './Markdown';
import CompanyLogo from './CompanyLogo';
import Footer from './Footer';

import maxReadableWidth from '../theme/maxReadableWidth';

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

  render() {
    const {
      data: {
        loading,
      },
    } = this.props;

    if (loading) return <FullScreenLoading />;

    const {
      data: {
        Job,
        Job: {
          headline,
          teaser,
          description,
          applyLink,
          cities,
          activeFrom,
          activeUntil,
          company,
          company: {
            name,
            slug,
            logo: {
              url: companyLogoUrl,
            },
          },
        },
      },
    } = this.props;

    return (
      <div>
        <Navbar dark />

        <Container pad padNavbar style={[styles.container, isSmall(this) && styles.small.container]}>
          <div style={[styles.company.container, isSmall(this) && styles.small.company.container]}>
            <CompanyLogo chaos company={company} />
            <Headline center medium level={3}>
              {isSmall(this) && `${headline} @ `} {name}
            </Headline>
            {isSmall(this) && <Cities cities={cities} padTop padBottom center/>}

            <div style={styles.active.container}>
              <Text center>
                Skelbimas aktyvus
              </Text>

              <div style={styles.active.range}>
                <ReactSimpleRange
                  trackColor={colors.black}
                  thumbColor={colors.red}
                  sliderColor={colors.lightLightBlack}
                  disableThumb
                  value={moment().valueOf()}
                  sliderSize={2}
                  min={moment(activeFrom).valueOf()}
                  max={moment(activeUntil).valueOf()}
                />
              </div>
              <Container style={styles.labels.container}>
                <Text>
                  {this.formatTime(activeFrom)}
                </Text>
                <Text>
                  {this.formatTime(activeUntil)}
                </Text>
              </Container>
            </div>

            <Container padBottom={isSmall(this)}>
              <PrimaryJobButton job={Job} />
              {!isSmall(this) && <SecondaryJobButtons job={Job} />}
            </Container>
          </div>

          <div style={[styles.content.container, isSmall(this) && styles.small.content.container]}>
            {!isSmall(this) && <Headline bold level={2} padBottom>
              {headline}
            </Headline>}
            {!isSmall(this) && <Cities cities={cities} padBottom/>}
            <Container padTop={isSmall(this)}>
              <Markdown source={description} />
            </Container>

            {isSmall(this) && <Container>
              <PrimaryJobButton job={Job} />
              <SecondaryJobButtons job={Job} />
            </Container>}
          </div>
        </Container>

        <Footer {...this.props} />
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
  query JobQuery($id: ID!) {
    Job(id: $id) {
      id
      headline
      teaser
      description
      activeFrom
      activeUntil
      applyLink

      cities {
        name
      }

      company {
        name
        slug
        logo {
          url
        }
        logoBackgroundColor

        _jobsMeta {
          count
        }
      }
    }
  }
`;

export default compose(
  graphql(JobQuery, {
    options: ({
      match: {
        params: {
          id,
        },
      },
    }) => ({
      variables: {
        id,
      },
    }),
  }),
  windowSize,
  Radium,
)(Job);
