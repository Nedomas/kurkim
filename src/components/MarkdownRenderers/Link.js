import React, { Component } from 'react';
import _ from 'lodash';

import colors from '../../theme/colors';
import Button from '../Button';

const BUTTON_REGEX = /^{(.*)}$/;

export default class MarkdownRendererLink extends Component {
  isButton() {
    const {
      children,
    } = this.props;

    return _.some(children, (child) => child.match(BUTTON_REGEX));
  }

  buttonText() {
    const {
      children,
    } = this.props;

    return _.map(children, (child) => child.match(BUTTON_REGEX)[1]);
  }

  render() {
    const {
      children,
      ...rest,
    } = this.props;

    if (this.isButton()) {
      return <Button center margin limitWidth {...rest} component='a' target='_blank'>{this.buttonText()}</Button>;
    }

    return <a style={styles.container} {...rest}>{children}</a>;
  }
}

const styles = {
  container: {
    color: colors.black,
  },
};
