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
import Text from './Text';
import FullScreenLoading from './FullScreenLoading';

import step from '@bloometry/step';

class CreativesSignup extends Component {
  render() {
    const {
      data: {
        loading,
      },
    } = this.props;

    if (loading) return <FullScreenLoading />;

    const {
      data: {
        Page: {
          content,
        },
      },
    } = this.props;

    return (
      <div>
        <Navbar dark {...this.props} />

        <Container dark chaos middle minWindowHeight>
          <Container center limited>
            <Text center>
              <Markdown source={content} />
            </Text>
          </Container>
        </Container>

        <Footer {...this.props} />
      </div>
    );
  }
}

const CreativesSignupQuery = gql`
  query CreativesSignupQuery {
    Page(id: "cjetpi88fcng801489rtle075") {
      content
    }
  }
`;

export default compose(
  graphql(CreativesSignupQuery),
  Radium,
)(CreativesSignup);
