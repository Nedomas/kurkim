import React, { Component } from 'react';
import { compose } from 'redux';
import Spinner from 'react-spinkit';
import Radium from 'radium';
import windowSize from 'react-window-size';
import _ from 'lodash';

import borderRadius from '../theme/borderRadius';
import step from '@bloometry/step';
import colors from '../theme/colors';
import fluid from '@bloometry/fluid';

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
      component = 'button',
    } = this.props;

    const small = this.props.windowWidth <= 650;
    const TagName = _.isString(component) ? component : Radium(component);

    return (
      <TagName
        {..._.omit(
          this.props,
          'loading',
          'style',
          'children',
          'longText',
          'transparent',
          'more',
          'disabled',
          'component',
          'tiny',
          'center',
          'windowWidth',
          'windowHeight',
        )}
        style={[
          styles.container,
          center && styles.center,
          tiny && styles.tiny,
          transparent && styles.transparent,
          more && styles.more,
          disabled && styles.disabled,
          longText && styles.longText,
          _.omit(style, 'color'),
          small && styles.small,
          this.needsWidth() && styles.needsWidth,
        ]}
        disabled={loading}
      >
        {loading ? <Spinner fadeIn='none' name='double-bounce' color={colors.white} /> : children}
      </TagName>
    );
  }
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    maxWidth: '320px',
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
    backgroundColor: colors.lightLightGrey,
    color: colors.blue,

    ':hover': {
      backgroundColor: colors.lightGrey,
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
  small: {
    width: 'inherit',
    maxWidth: 'inherit',
  },
};

export default compose(
  windowSize,
  Radium,
)(Button);
