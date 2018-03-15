import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import windowSize from 'react-window-size';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactSimpleRange from 'react-simple-range';

import step from '@bloometry/step';
import colors from '../theme/colors';

import Cities from './Cities';
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
            _jobsMeta: {
              count,
            },
          },
        },
      },
    } = this.props;

    const small = this.props.windowWidth <= 768;

    return (
      <div>
        <Navbar dark />

        <Container style={styles.container}>
          <div style={styles.company.container}>
            <CompanyLogo chaos company={company} />
            <Headline center medium tier={3}>
              {name}
            </Headline>

            <div style={styles.active.container}>
              <Text center tier={4}>
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
                <Text tier={4}>
                  {this.formatTime(activeFrom)}
                </Text>
                <Text tier={4}>
                  {this.formatTime(activeUntil)}
                </Text>
              </Container>
            </div>

            <Button component='a' href={applyLink} target='_blank' center>
              Aplikuoti
            </Button>

            <Button transparent component={Link} to={`/companies/${slug}`} center style={styles.secondaryButton}>
              Visi {name} skelbimai ({count})
            </Button>

            <Button transparent component={Link} to={`/companies/${slug}`} center style={styles.secondaryButton}>
              Daugiau apie {name}
            </Button>
          </div>

          <div style={styles.content.container}>
            <Headline bold tier={2}>
              {headline}
            </Headline>
            <Cities cities={cities} />
            <Markdown source={description} />
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
    padding: `0 ${step(2)}`,
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
