import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import Radium from 'radium';
import windowSize from 'react-window-size';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';

import Navbar from './Navbar';

class Job extends Component {
  render() {
    const {
      data: {
        loading,
      },
    } = this.props;

    if (loading) return <div/>;

    const {
      data: {
        Job: {
          headline,
          teaser,
          description,
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

        <div style={styles.container}>
          <div style={styles.company.container}>
            <img src={companyLogoUrl} />
            <div>
              {name}
            </div>
          </div>

          <div style={styles.content.container}>
            <div>
              {headline}
            </div>
            <div>
              <ReactMarkdown source={description} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  company: {
    container: {
      width: '30%',
    },
  },
  content: {
    container: {
      width: '70%',
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

      cities {
        name
      }

      company {
        name
        logo {
          url
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
