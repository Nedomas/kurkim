import React, { Component } from 'react';
import _ from 'lodash';

import step from '@bloometry/step';
import colors from '../../theme/colors';

import Headline from '../Headline';
const FLOWERFUL_REGEX = /^{flowerful} (.*)$/;

export default class MarkdownRendererHeading extends Component {
  isFlowerful() {
    const {
      children,
    } = this.props;

    return _.some(children, (child) => child.match(FLOWERFUL_REGEX));
  }

  text() {
    const {
      children,
    } = this.props;

    return _.map(children, (child) => child.match(FLOWERFUL_REGEX)[1]);
  }

  render() {
    const {
      children,
      ...rest,
    } = this.props;

    if (this.isFlowerful()) {
      return (
        <Headline uppercase flowerful padBottom={0.5} bold {...rest}>
          {this.text()}
        </Headline>
      );
    }

    return (
      <Headline padBottom={0.5} bold {...rest}>
        {children}
      </Headline>
    );
  }
}
