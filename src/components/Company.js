import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'redux';
import Radium from 'radium';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import extractDomain from 'extract-domain';

import Navbar from './Navbar';
import Cities from './Cities';
import CardsGrid from './CardsGrid';
import Container from './Container';
import Headline from './Headline';
import Markdown from './Markdown';
import Icon from './Icon';
import Text from './Text';
import FullScreenLoading from './FullScreenLoading';

import step from '@bloometry/step';
import colors from '../theme/colors';
import fluid from '@bloometry/fluid';
import borderRadius from '../theme/borderRadius';
import constrain from '../theme/constrain';
import CompanyLogo from './CompanyLogo';
import Footer from './Footer';

class Company extends Component {
  render() {
    const {
      data: {
        loading,
      },
    } = this.props;

    if (loading) return <FullScreenLoading />;

    const {
      data: {
        Company,
        Company: {
          name,
          aboutUrl,
          description,
          jobs,
        },
      },
    } = this.props;

    return (
      <div>
        <Navbar dark {...this.props} />

        <Container pad readable center>
          <CompanyLogo chaos company={Company} />
          <Headline level={2} center bold padBottom>
            {name}
          </Headline>
          <Container style={styles.meta.container} padBottom>
            <Cities cities={_.flatMap(jobs, 'cities')} />

            <Text level={2} padLeft>
              <a href={aboutUrl} target='_blank' style={styles.meta.link.container}>
                <Icon type='link' tiny />
                <span style={styles.meta.link.text}>
                  {extractDomain(aboutUrl)}
                </span>
              </a>
            </Text>
          </Container>
          <Text level={3} padTop padBottom>
            <Markdown source={description} />
          </Text>
        </Container>

        <Container pad>
          <CardsGrid cards={jobs} />
        </Container>

        <Footer {...this.props} />
      </div>
    );
  }
};

const styles = {
  meta: {
    container: {
      display: 'flex',
      justifyContent: 'center',
    },
    link: {
      container: {
        color: colors.black,
        textDecoration: 'none',
      },
      text: {
        paddingLeft: step(0.5),
        textDecoration: 'underline',
      },
    },
  },
};

export const CompanyQuery = gql`
  query CompanyQuery($slug: String) {
    Company(slug: $slug) {
      name
      slug
      description
      aboutUrl

      logo {
        url
      }

      logoBackgroundColor

      jobs {
        id
        headline

        cities {
          name
        }

        company {
          name

          logo {
            url
          }

          displayImage {
            url
          }

          logoBackgroundColor
        }
      }

      _jobsMeta {
        count
      }
    }
  }
`;

export default compose(
  graphql(CompanyQuery, {
    options: ({
      match: {
        params: {
          slug,
        },
      },
    }) => ({
      variables: {
        slug,
      },
    }),
  }),
  Radium,
)(Company);
