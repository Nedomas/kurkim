import React, { Component } from 'react';
import Radium from 'radium';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import step from '@bloometry/step';

import Container from './Container';
import Button from './Button';

class SecondaryJobButtons extends Component {
  render() {
    const {
      job: {
        company: {
          name,
          slug,
          _jobsMeta: {
            count,
          },
        },
      },
    } = this.props;

    return (
      <Container>
        <Button transparent component={Link} to={`/i/${slug}`} center style={styles.secondaryButton}>
          Visos {name} pozicijos ({count})
        </Button>

        <Button transparent component={Link} to={`/i/${slug}`} center style={styles.secondaryButton}>
          Daugiau apie {name}
        </Button>
      </Container>
    );
  }
}

const styles = {
  secondaryButton: {
    marginTop: step(),
  },
};

export default compose(
  Radium,
)(SecondaryJobButtons);
