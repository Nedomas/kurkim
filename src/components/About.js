import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';
import Radium from 'radium';

import Navbar from './Navbar';
import Container from './Container';
import Headline from './Headline';
import Button from './Button';
import Footer from './Footer';
import Markdown from './Markdown';
import FullScreenLoading from './FullScreenLoading';

import step from '@bloometry/step';

class About extends Component {
  render() {
    const {
      data: {
        loading,
      },
    } = this.props;

    if (loading) return <FullScreenLoading />;

    const {
      data: {
        CustomText: {
          content,
        },
      },
    } = this.props;

    return (
      <div>
        <Navbar dark {...this.props} />

        <Container pad dark chaos middle>
          <Container center limited>
            <Markdown source={content} />
          </Container>
        </Container>

        <Footer {...this.props} />
      </div>
    );
  }
}

const AboutQuery = gql`
  query AboutQuery {
    CustomText(slug: "about") {
      content
    }
  }
`;

export default compose(
  graphql(AboutQuery),
  Radium,
)(About);
