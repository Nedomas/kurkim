import React, { Component } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import { compose } from 'redux';
import windowSize from 'react-window-size';
import { Field, reduxForm } from 'redux-form';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Confetti from 'react-confetti';

import Markdown from './Markdown';
import step from '@bloometry/step';
import Container from './Container';
import Text from './Text';
import Input from './Input';
import Button from './Button';

import borderRadius from '../theme/borderRadius';
import colors from '../theme/colors';
import imageUrl from '../theme/imageUrl';
import graphcoolClient from '../helpers/graphcoolClient';
import track from '../helpers/track';

class SubscribeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
      loading: false,
      success: false,
      error: false,
      confetti: 0,
    };
  }

  componentDidUpdate() {
    this.props.updateGrid();
  }

  async handleSubmit(values) {
    track('Subscribe Clicked', values);

    this.setState({
      initialized: true,
      loading: true,
    });

    try {
      await graphcoolClient.mutate({
        mutation: SubscribeCardMutation,
        variables: values,
      });

      this.setState({
        loading: false,
        success: true,
      });

      this.addConfetti();
    } catch (e) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  }

  addConfetti() {
    this.setState((prevState) => ({
      confetti: prevState.confetti + 300,
    }));
  }

  render() {
    const {
      height,
      handleSubmit,
      data,
    } = this.props;

    const {
      success,
      loading,
      confetti,
    } = this.state;

    return (
      <Container
        {...this.props}
        style={[
          styles.container,
          {
            height: `${height}px`,
            backgroundImage: `url('${imageUrl({ handle: 'Pqfe42oQuS2XbSJFG1gr' }, { height })}')`,
          },
        ]}
      >
        <Container pad={1} style={styles.contentContainer}>
          <Markdown source={_.get(data, 'subscribeCard.content')} />

          {!success && <form style={styles.form} onSubmit={handleSubmit((values) => this.handleSubmit(values))}>
            <Field marginBottom={0.5} component={Input} placeholder='Vardas' name='firstName' type='text' />
            <Field marginBottom component={Input} placeholder='El. paštas' name='email' type='email' />

            <Button type='submit' loading={loading} bitTransparent>
              Prenumeruoti
            </Button>
          </form>}
          {success && <Container>
            <Container style={styles.confetti}>
              <Confetti height={350} recycle={false} numberOfPieces={confetti} />
            </Container>
            <Text center padBottom={2}>
              Tu sėkmingai užsiprenumeravai Kurkim naujienlaiškį! Pasimatysim tavo el. pašto dėžutėje netrukus.
            </Text>
            <Button onClick={() => { track('Confetti Clicked'); this.addConfetti() }}>
              Vuhu! 🎉
            </Button>
          </Container>}
        </Container>
      </Container>
    );
  }
}

const SubscribeCardQuery = gql`
  query SubscribeCardQuery {
    subscribeCard: CustomText(slug: "subscribe-card") {
      content
    }
  }
`;

const SubscribeCardMutation = gql`
  mutation SubscribeCardMutation($firstName: String!, $email: String!) {
    subscribe(firstName: $firstName, email: $email) {
      email
    }
  }
`;

const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  }

  return errors;
};

export default compose(
  graphql(SubscribeCardQuery),
  windowSize,
  reduxForm({
    form: 'subscribe',
    validate,
  }),
  Radium,
)(SubscribeCard);

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#E5D3D1',
    borderRadius,
    boxSizing: 'border-box',
    backgroundSize: 'cover',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius,
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
  },
  confetti: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
};
