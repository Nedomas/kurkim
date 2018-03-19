import React, { Component } from 'react';

import Splash from './Splash';
import LandingCards from './LandingCards';
import Footer from './Footer';
import Container from './Container';
import Text from './Text';
import BlogPostList from './BlogPostList';

export default class Landing extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Splash {...this.props} />
        <Container center pad>
          <Text center>
            Čia bus trumpas aprašymas apie Kurkim
          </Text>
        </Container>
        <LandingCards {...this.props} />
        <BlogPostList {...this.props} hideEmpty />

        <Container center pad>
          <Text center>
            Ar nori, kad Kurkim publikuotų tavo vizualus? Parašyk mums.
          </Text>
        </Container>
        <Container center pad>
          <Text center>
            Gal nori pasidalinti savo kūrybine patirtimi su Kurkim bendruomene?
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
