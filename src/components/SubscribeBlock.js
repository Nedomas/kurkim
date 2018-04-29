import React, { Component } from 'react';
import Radium, { Style } from 'radium';
import _ from 'lodash';
import { compose } from 'redux';
import windowSize from 'react-window-size';
import { Field, reduxForm } from 'redux-form';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import LazyLoad from 'react-lazyload';

import Markdown from './Markdown';
import step from '@bloometry/step';
import Container from './Container';
import Text from './Text';
import Input from './Input';
import Button from './Button';

import borderRadius from '../theme/borderRadius';
import colors from '../theme/colors';
import imageUrl from '../theme/imageUrl';
import isSmall from '../theme/isSmall';
import graphcoolClient from '../helpers/graphcoolClient';
import track from '../helpers/track';

class SubscribeBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
      loading: false,
      success: false,
      error: false,
    };
  }

  async handleSubmit(values) {
    track('Subscribe Clicked in Block', values);

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
      handleSubmit,
      data,
    } = this.props;

    const {
      success,
      loading,
    } = this.state;

    return (
      <LazyLoad offset={600}>
        <Container
          marginTop={6}
          padTop={2}
          padBottom={2}
          {...this.props}
          style={[
            styles.container,
            {
              backgroundImage: `url("${imageUrl(_.get(data, 'subscribeBlock.image'), { width: this.props.windowWidth, height: this.props.windowHeight, quality: 70 })}")`,
            }
          ]}
        >
          <Container
            pad={6}
            style={[
              styles.contentContainer,
              isSmall(this) && styles.small.contentContainer,
            ]}
            readable
            center
          >
            <Container style={styles.textContainer}>
              <Markdown color={colors.white} source={_.get(data, 'subscribeBlock.content')} />
            </Container>

            {!success && <Container style={styles.form}>
              <form onSubmit={handleSubmit((values) => this.handleSubmit(values))}>
                <Style scopeSelector='.subscribe-block-input::-webkit-input-placeholder' rules={styles.placeholder} />
                <Field className='subscribe-block-input' style={styles.input} marginBottom={0.5} component={Input} placeholder='Vardas' name='firstName' type='text' />
                <Field className='subscribe-block-input' style={styles.input} marginBottom component={Input} placeholder='El. paštas' name='email' type='email' />

                <Button type='submit' loading={loading} bitTransparent>
                  Prenumeruoti
                </Button>
              </form>
            </Container>}
            {success && <Container>
              <Text center padBottom={2} color={colors.white}>
                Tu sėkmingai užsiprenumeravai Kurkim naujienlaiškį! Pasimatysim tavo el. pašto dėžutėje netrukus.
              </Text>
              <Button>
                Vuhu! 🎉
              </Button>
            </Container>}
          </Container>
        </Container>
      </LazyLoad>
    );
  }
}

const SubscribeBlockQuery = gql`
  query SubscribeBlockQuery {
    subscribeBlock: CustomText(slug: "subscribe-block") {
      content
      image {
        handle
      }
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
  graphql(SubscribeBlockQuery),
  windowSize,
  reduxForm({
    form: 'subscribeBlock',
    validate,
  }),
  Radium,
)(SubscribeBlock);

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    // minHeight: '500px',
    // backgroundColor: colors.black,
    borderRadius,
    boxSizing: 'border-box',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  contentContainer: {
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius,
    alignItems: 'center',
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
  input: {
    backgroundColor: colors.almostAlmostBlack,
    color: colors.white,
  },
  placeholder: {
    color: colors.almostWhite,
  },
  form: {
    // maxWidth: '400px',
    width: '100%',
  },
  textContainer: {
    // maxWidth: '400px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
  },
  small: {
    contentContainer: {
      flexDirection: 'column',
    },
  },
};
