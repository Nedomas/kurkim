import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'redux';
import Radium from 'radium';
import _ from 'lodash';
import extractDomain from 'extract-domain';
import moment from 'moment';

import Navbar from './Navbar';
import Cities from './Cities';
import CardsGrid from './CardsGrid';
import Container from './Container';
import Headline from './Headline';
import Markdown from './Markdown';
import Icon from './Icon';
import Text from './Text';
import FullScreenLoading from './FullScreenLoading';
import ScrollToTop from './ScrollToTop';

import step from '@bloometry/step';
import colors from '../theme/colors';
import CompanyLogoWithBorder from './CompanyLogoWithBorder';
import Footer from './Footer';

class Company extends Component {
  jobs() {
    const {
      data: {
        Company: {
          jobs,
        },
      },
    } = this.props;

    return _.map(jobs, (job) => ({ type: 'job', ...job }));
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
        Company,
        Company: {
          name,
          aboutUrl,
          description,
        },
      },
    } = this.props;

    return (
      <div>
        <ScrollToTop />
        <Navbar dark {...this.props} />

        <Container pad readable center>
          <CompanyLogoWithBorder company={Company} />
          <Headline level={2} center bold padBottom>
            {name}
          </Headline>
          <Container style={styles.meta.container} padBottom>
            <Cities cities={_.flatMap(this.jobs(), 'cities')} />

            {aboutUrl && <Text level={2} padLeft>
              <a href={aboutUrl} target='_blank' style={styles.meta.link.container}>
                <Icon type='link' tiny />
                <span style={styles.meta.link.text}>
                  {extractDomain(aboutUrl)}
                </span>
              </a>
            </Text>}
          </Container>
          <Text level={3} padTop padBottom justify>
            <Markdown source={description} />
          </Text>
        </Container>

        <Container pad>
          <CardsGrid cards={this.jobs()} />
        </Container>

        <Footer {...this.props} marginTop={8} />
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
  query CompanyQuery($slug: String, $isPublished: Boolean!, $today: DateTime!) {
    Company(slug: $slug) {
      name
      slug
      description
      aboutUrl

      displayImage {
        handle
      }

      logo {
        handle
      }

      logoBackgroundColor

      jobs(
        filter: {
          isPublished: $isPublished,
          activeUntil_gte: $today,
        }
      ) {
        id
        headline
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

          displayImage {
            handle
          }

          logoBackgroundColor
        }
      }

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
`;

export default compose(
  graphql(CompanyQuery, {
    options: ({
      location: {
        search,
      },
      match: {
        params: {
          slug,
        },
      },
    }) => ({
      variables: {
        slug,
        isPublished: search !== '?unpublished',
        today: moment().toISOString(),
      },
    }),
  }),
  Radium,
)(Company);
