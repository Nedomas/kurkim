import React, { Component } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import moment from 'moment';
import lt from 'moment/locale/lt';
import Measure from 'react-measure';
import plural from 'plural';
import { compose } from 'redux';
import windowSize from 'react-window-size';
import { Field, reduxForm } from 'redux-form';

import step from '@bloometry/step';
import Container from './Container';
import Headline from './Headline';
import Text from './Text';
import CompanyLogo from './CompanyLogo';
import Input from './Input';
import Button from './Button';
import ListItem from './MarkdownRenderers/ListItem';

import borderRadius from '../theme/borderRadius';
import colors from '../theme/colors';
import imageUrl from '../theme/imageUrl';

class SubscribeCard extends Component {
  onSubmit(values) {
    console.log('submitted', values);
  }

  render() {
    const {
      height,
      handleSubmit,
    } = this.props;

    return (
      <Container
        {...this.props}
        style={[styles.container, { minHeight: `400px` }]}
      >
        <Container pad={1}>
          <Headline level={3} bold padBottom>
            Užsiprenumeruok naujienlaiškį! 🎉
          </Headline>

          <Container padBottom>
            <ListItem>
              Kūrybingi darbo pasiūlymai
            </ListItem>
            <ListItem>
              Kvietimai į renginius
            </ListItem>
            <ListItem>
              Patarimai kūrybingumui auginti!
            </ListItem>
          </Container>

          <form onSubmit={handleSubmit((values) => this.onSubmit(values))}>
            <Field marginBottom={0.5} component={Input} placeholder='Vardas' name='firstName' type='text' />
            <Field marginBottom component={Input} placeholder='El. paštas' name='email' type='email' />

            <Button type='submit' style={styles.button}>
              Prenumeruoti
            </Button>
          </form>
        </Container>
      </Container>
    );
  }
}

export default compose(
  windowSize,
  reduxForm({
    form: 'subscribe'
  }),
  Radium,
)(SubscribeCard);

const styles = {
  button: {
    width: `calc(100% - ${step(2)})`,
  },
  container: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    borderRadius,
    backgroundColor: colors.lightLightBlack,
    borderRadius,
  },
  imageContainer: {
    position: 'absolute',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius,
  },
  gradientContainer: {
    position: 'absolute',
    width: '100%',
    background: `linear-gradient(${colors.black}, ${colors.tintBlack}, ${colors.black})`,
    opacity: 0.7,
    borderRadius,
  },
  contentContainer: {
    position: 'absolute',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: colors.white,
    padding: step(),
  },
  company: {
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    logo: {
      marginBottom: 0,
      paddingBottom: 0,
    },
    name: {
      paddingLeft: step(),
    },
  },
  last: {
    container: {
      marginRight: `calc(300px + ${step(1.5)})`,
    },
  },
  hover: {
    imageContainer: {
      filter: 'saturate(200%)',
    },
    gradientContainer: {
      opacity: 0.3,
    },
  },
};
