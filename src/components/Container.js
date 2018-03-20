import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';
import windowSize from 'react-window-size';
import _ from 'lodash';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

import step from '@bloometry/step';
import fluid from '@bloometry/fluid';
import constrain from '../theme/constrain';
import maxReadableWidth from '../theme/maxReadableWidth';
import isSmall from '../theme/isSmall';

class Container extends Component {
  steps(number, defaultSteps) {
    if (!_.isNumber(number)) return step(defaultSteps);

    return step(number);
  }

  isHtmlElement() {
    return _.isString(this.component());
  }

  tagName() {
    return this.isHtmlElement() ? this.component() : Radium(this.component());
  }

  component() {
    const {
      component = 'div',
    } = this.props;

    return component;
  }

  childProps() {
    if (!this.isHtmlElement()) {
      return _.pick(this.props, _.keys(this.component().propTypes));
    }

    return filterInvalidDOMProps(this.props);
  }

  render() {
    const {
      style,
      center,
      middle,
      narrow,
      limited,
      left,
      right,
      chaos,
      dark,
      minWindowHeight,
      windowWidth,
      pad,
      readable,
      padTop,
      padBottom,
      padLeft,
      spaceBetween,
      padNavbar,
      margin,
      marginTopRaw,
      marginLeft,
      marginRight,
      marginBottom,
      children,
    } = this.props;

    const TagName = this.tagName();

    return (
      <TagName
        {...this.childProps()}
        style={[
          center && styles.center,
          narrow && styles.narrow,
          limited && styles.limited,
          chaos && styles.chaos,
          dark && chaos && styles.dark.chaos,
          minWindowHeight && styles.minWindowHeight,
          middle && styles.middle,
          left && styles.left,
          right && styles.right,
          spaceBetween && styles.spaceBetween,
          pad && { padding: this.steps(pad, isSmall(this) ? 1.5 : 2) },
          margin && { marginTop: step(1), marginBottom: step(1) },
          marginLeft && { marginLeft: this.steps(marginLeft, 1) },
          marginRight && { marginRight: this.steps(marginRight, 1) },
          marginBottom && { marginBottom: this.steps(marginBottom, 1) },
          marginTopRaw && { marginTop: marginTopRaw },
          padTop && { paddingTop: this.steps(padTop, 1) },
          padBottom && { paddingBottom: this.steps(padBottom, 1) },
          padLeft && { paddingLeft: this.steps(padLeft, 1) },
          readable && styles.readable,
          padNavbar && { paddingTop: this.steps(padNavbar, 5) },
          style,
        ]}
      >
        {children}
      </TagName>
    );
  }
};

const styles = {
  minWindowHeight: {
    minHeight: '60vh',
  },
  center: {
    margin: '0 auto',
  },
  middle: {
    display: 'flex',
    paddingTop: 'calc(100vh - 60px - ${step(6)})',
    justifyContent: 'center',
    alignItems: 'center',
  },
  narrow: {
    width: '100%',
    maxWidth: '300px',
  },
  limited: {
    maxWidth: '700px',
  },
  left: {
    textAlign: 'left',
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chaos: {
    backgroundImage: 'url("/splash.svg")',
    backgroundSize: fluid(200, 400),
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '95% 40%',
  },
  dark: {
    chaos: {
      backgroundImage: 'url("/chaos-black.svg")',
    },
  },
  readable: {
    maxWidth: maxReadableWidth,
  },
};

export default compose(
  windowSize,
  Radium,
)(Container);
