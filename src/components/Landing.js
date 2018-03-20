import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';
import Radium from 'radium';
import _ from 'lodash';

import step from '@bloometry/step';
import Splash from './Splash';
import LandingCards from './LandingCards';
import Footer from './Footer';
import Container from './Container';
import Text from './Text';
import BlogPostList from './BlogPostList';
import Markdown from './Markdown';

class Landing extends Component {
  render() {
    const {
      data,
    } = this.props;

    return (
      <div style={styles.container}>
        <Splash {...this.props} />
        <Container center pad readable marginTopRaw={step(1)} marginBottomRaw={step(-2.5)}>
          <Markdown center source={_.get(data, 'shortIntro.content')} />
        </Container>
        <LandingCards {...this.props} />
        <Container center pad marginBottom={-2}>
          <Markdown center source={_.get(data, 'shareStory.content')} />
        </Container>
        <BlogPostList {...this.props} hideEmpty />

        <Container center pad readable>
          <Text grey>
            <Markdown center source={_.get(data, 'shareVisual.content')} />
          </Text>
        </Container>
        <Footer {...this.props} />
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 auto',
  },
}

const LandingQuery = gql`
  query LandingQuery {
    shortIntro: CustomText(slug: "short-intro") {
      content
    }

    shareStory: CustomText(slug: "share-story") {
      content
    }

    shareVisual: CustomText(slug: "share-visual") {
      content
    }
  }
`;

export default compose(
  graphql(LandingQuery),
  Radium,
)(Landing);
