import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import windowSize from 'react-window-size';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';
import _ from 'lodash';

import step from '@bloometry/step';
import colors from '../theme/colors';

import Navbar from './Navbar';
import Container from './Container';
import Headline from './Headline';
import Text from './Text';
import Button from './Button';
import Markdown from './Markdown';

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

  render() {
    const {
      data: {
        loading,
      },
    } = this.props;

    if (loading) return <div/>;
    console.log(this.logoBackgroundColor());

    const {
      data: {
        Job: {
          headline,
          teaser,
          description,
          applyLink,
          company: {
            name,
            logo: {
              url: companyLogoUrl,
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
            <div style={styles.company.logo.container}>
              <div
                style={[
                  {
                    backgroundImage: `url('${companyLogoUrl}')`,
                    backgroundColor: this.logoBackgroundColor(),
                  },
                  styles.company.logo.img,
                ]}
              />
            </div>
            <Headline tier={3}>
              {name}
            </Headline>
            <Text tier={3}>
              Motyvacinį laišką ir gyvenimo aprašymą (CV) prašome siųsti info@atostoguparkas.lt Informuosime tik atrinktus kandidatus.
            </Text>
            <Button component='a' href={applyLink} target='_blank' center>
              Aplikuoti
            </Button>
          </div>

          <div style={styles.content.container}>
            <Headline tier={2}>
              {headline}
            </Headline>
            <Markdown source={description} />
          </div>
        </Container>
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
      textAlign: 'center',
      paddingRight: step(3),
    },
    logo: {
      img: {
        backgroundSize: '160px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '9999999999px',
        border: `1px solid ${colors.black}`,
        width: '200px',
        height: '200px',
        margin: '0 auto',
      },
      container: {
        backgroundImage: 'url("/chaos-black.svg")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        paddingBottom: step(2),
        marginBottom: step(1.5),
      },
    },
  },
  content: {
    container: {
      width: '70%',
      maxWidth: maxReadableWidth,
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
        logo {
          url
        }
        logoBackgroundColor
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
