import React, { Component } from 'react';

import Navbar from './Navbar';
import Container from './Container';
import Headline from './Headline';
import Button from './Button';
import Footer from './Footer';

import step from '@bloometry/step';

export default class Landing extends Component {
  render() {
    return (
      <div>
        <Navbar dark {...this.props} />

        <Container dark chaos minWindowHeight>
          <Container center limited style={styles.container}>
            <Headline>
              Mes vis dar jauni
            </Headline>
            <Headline tier={2}>
              Neužilgo plėsime savo kūrybininkų bendruomenę
              ir atidarėme "early-bird" registraciją.
            </Headline>
            <Button center component='a' href='https://vaida6.typeform.com/to/Mwj5Y8' target='_blank' style={styles.button}>
              Registruotis
            </Button>
          </Container>
        </Container>

        <Footer {...this.props} />
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
