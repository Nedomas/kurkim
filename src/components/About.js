import React, { Component } from 'react';

import Navbar from './Navbar';
import Container from './Container';
import Headline from './Headline';
import Button from './Button';

import step from '@bloometry/step';

export default class About extends Component {
  render() {
    return (
      <div>
        <Navbar dark {...this.props} />

        <Container dark chaos minWindowHeight>
          <Container center limited style={styles.container}>
            <Headline>
              Apie Kurkim
            </Headline>
            <Headline tier={2}>
              Mes esam tokie ir tokie
            </Headline>
          </Container>
        </Container>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingTop: step(3),
  },
  button: {
    marginTop: step(),
  },
};
