import React, { Component } from 'react';
import { compose } from 'redux';
import Spinner from 'react-spinkit';
import Radium from 'radium';
import windowSize from 'react-window-size';

import borderRadius from '../theme/borderRadius';
import step from '@bloometry/step';
import colors from '../theme/colors';
import fluid from '@bloometry/fluid';

import Container from './Container';

class Button extends Component {
  needsWidth() {
    const {
      component = 'button',
    } = this.props;

    return component === 'button';
  }

  render() {
    const {
      loading,
      style,
      children,
      longText,
      transparent,
      more,
      disabled,
      center,
      tiny,
      limitWidth,
      component = 'button',
      active,
    } = this.props;

    return (
      <Container
        {...this.props}
        component={component}
        style={[
          styles.container,
          center && styles.center,
          tiny && styles.tiny,
          transparent && styles.transparent,
          more && styles.more,
          disabled && styles.disabled,
          longText && styles.longText,
          limitWidth && styles.limitWidth,
          this.needsWidth() && styles.needsWidth,
          active && styles.active,
          style,
        ]}
        disabled={loading}
      >
        {loading ? <Spinner fadeIn='none' name='double-bounce' color={colors.white} /> : children}
      </Container>
    );
  }
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    height: fluid(50, 70),

    padding: `0 ${step()}`,

    fontSize: fluid(16, 18),
    letterSpacing: '.06em',
    color: colors.white,
    backgroundColor: colors.black,
    textDecoration: 'none',
    border: 0,
    borderRadius,
    cursor: 'pointer',
    transition: 'background-color 300ms',

    ':hover': {
      backgroundColor: colors.lighterBlack,
    },
  },
  limitWidth: {
    maxWidth: '320px',
  },
  center: {
    margin: '0 auto',
  },
  needsWidth: {
    width: '100%',
  },
  tiny: {
    display: 'inline-flex',
    width: 'initial',
    padding: `${step(0.5)} ${step()}`,
    lineHeight: 'initial',
    height: 'initial',
  },
  transparent: {
    color: colors.lighterBlack,
    backgroundColor: colors.lightLightBlack,

    ':hover': {
      backgroundColor: colors.darkerLightLightBlack,
    },
  },
  more: {
    backgroundColor: colors.lightLightGrey,
    color: colors.black,

    ':hover': {
      backgroundColor: colors.lightGrey,
    },
  },
  disabled: {
    color: colors.grey,
    border: `1px solid ${colors.borderGrey}`,
    backgroundColor: colors.white,

    ':hover': {
      backgroundColor: colors.lightLightGrey,
    },
  },
  longText: {
    fontSize: fluid(14, 16),
  },
  active: {
    border: `1px solid ${colors.lighterBlack}`,
  },
};

export default compose(
  windowSize,
  Radium,
)(Button);
