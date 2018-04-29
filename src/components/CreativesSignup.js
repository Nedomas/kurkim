import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';
import Radium from 'radium';

import Navbar from './Navbar';
import Container from './Container';
import Footer from './Footer';
import Markdown from './Markdown';
import Text from './Text';
import FullScreenLoading from './FullScreenLoading';
import ScrollToTop from './ScrollToTop';

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
        creativesSignup: {
          content,
        },
      },
    } = this.props;

    return (
      <div>
        <ScrollToTop />
        <Navbar dark {...this.props} />

        <Container pad dark middle minWindowHeight>
          <Container center>
            <Text center>
              <Markdown source={content} />
            </Text>
          </Container>
        </Container>

        <Footer {...this.props} marginTop={7} />
      </div>
    );
  }
}

const CreativesSignupQuery = gql`
  query CreativesSignupQuery {
    creativesSignup: CustomText(slug: "creatives-signup") {
      content
    }
  }
`;

export default compose(
  graphql(CreativesSignupQuery),
  Radium,
)(CreativesSignup);
