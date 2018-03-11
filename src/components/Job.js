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

    console.log(this.props);
    const {
      data: {
        Job: {
          description,
        },
      },
    } = this.props;

    const small = this.props.windowWidth <= 768;

    return (
      <div>
        <Navbar dark />

        <div style={[styles.container, small && styles.small.container]}>
          <div style={styles.blocks.top}>
            <div style={styles.mainPhoto.container}>
            </div>

            <div style={styles.content.container}>
              <div style={styles.description}>
                <ReactMarkdown source={description} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 auto',
    padding: '40px 120px',
  },
  blocks: {
    top: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  mainPhoto: {
    container: {
      maxWidth: '500px',
      marginRight: '50px',
    },
    img: {
      width: '100%',
    },
  },
  content: {
    container: {
      width: '100%',
      maxWidth: '450px',
    },
  },
  fullName: {
    fontSize: '60px',
    margin: '-15px 0 0 -6px',
  },
  title: {
    fontSize: '30px',
    marginLeft: '-3px',
  },
  city: {
    paddingTop: '10px',
  },
  small: {
    container: {
      padding: '40px',
    },
  },
}

const JobQuery = gql`
  query JobQuery($id: ID!) {
    Job(id: $id) {
      id
      headline
      teaser
      description
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
