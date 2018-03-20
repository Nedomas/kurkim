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
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import withMutationState from 'apollo-mutation-state';

import Markdown from './Markdown';
import step from '@bloometry/step';
import fluid from '@bloometry/fluid';
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
import graphcoolClient from '../helpers/graphcoolClient';

class SubscribeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mutation: {
        initialized: false,
        loading: false,
        success: false,
        error: false,
      },
    };
  }

  async handleSubmit(values) {
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
    } catch (e) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  }

  render() {
    const {
      height,
      handleSubmit,
      data,
    } = this.props;

    const {
      mutation: {
        loading,
      },
    } = this.state;

    console.log(this.props);
    return (
      <Container
        {...this.props}
        style={[styles.container, { height: `${height}px` }]}
      >
        <Container pad={1} style={styles.contentContainer}>
          <Markdown source={_.get(data, 'subscribeCard.content')} />

          <form style={styles.form} onSubmit={handleSubmit((values) => this.handleSubmit(values))}>
            <Field marginBottom={0.5} component={Input} placeholder='Vardas' name='firstName' type='text' />
            <Field marginBottom component={Input} placeholder='El. paštas' name='email' type='email' />

            <Button type='submit'>
              Prenumeruoti
            </Button>
          </form>
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
  console.log('err', errors);

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
    // position: 'relative',
    width: '100%',
    borderRadius,
    backgroundColor: colors.lightLightBlack,
    borderRadius,
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
};
