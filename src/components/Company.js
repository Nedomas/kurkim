import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'redux';
import Radium from 'radium';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import extractDomain from 'extract-domain';

import Navbar from './Navbar';
import Card from './Card';
import Container from './Container';
import Headline from './Headline';
import Markdown from './Markdown';
import Text from './Text';
import step from '@bloometry/step';
import colors from '../theme/colors';
import fluid from '@bloometry/fluid';
import borderRadius from '../theme/borderRadius';
import constrain from '../theme/constrain';
import CompanyLogo from './CompanyLogo';

class Company extends Component {
  render() {
    const {
      data: {
        loading,
      },
    } = this.props;

    if (loading) return <div />;

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

        <Container center style={styles.container}>
          <CompanyLogo company={Company} />
          <Headline tier={2} center>
            {name}
          </Headline>
          <Text tier={3} center>
            <a href={aboutUrl}>{extractDomain(aboutUrl)}</a>
          </Text>
          <Text tier={3} center>
            {_.uniq(_.compact(_.flatMap(_.flatMap(jobs, 'cities'), 'name'))).join(', ')}
          </Text>
          <Markdown source={description} />

          <Headline tier={3} center>
            Visi {name} darbo skelbimai
          </Headline>
          <div>
            {_.map(jobs, (job) => <Card key={job.id} data={job} />)}
          </div>
        </Container>
      </div>
    );
  }
};

const styles = {
  displayImage: {
    width: '100%',
    height: fluid(200, 400),
    backgroundSize: 'cover',
  },
  container: {
    ...constrain,
    paddingTop: step(2),
    textAlign: 'left',
  },
  teaser: {
    padding: `${step(3)} 0 ${step()}`,
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
