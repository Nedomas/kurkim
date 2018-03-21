import React, { Component } from 'react';
import _ from 'lodash';
import Radium from 'radium';
import { compose } from 'redux';

import colors from '../../theme/colors';
import track from '../../helpers/track';
import Button from '../Button';

const BUTTON_REGEX = /^{(.*)}$/;

class MarkdownRendererLink extends Component {
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
      return <Button onClick={() => track(`${this.buttonText()} Clicked`, { href: this.props.href })} center margin limitWidth {...rest} component='a' target='_blank'>{this.buttonText()}</Button>;
    }

    return <a onClick={() => track(`${children.join(' ')} Clicked`, { href: this.props.href })} style={styles.container} {...rest}>{children}</a>;
  }
}

const styles = {
  container: {
    color: colors.black,
    textDecoration: 'none',
    fontWeight: 500,

    ':hover': {
      textDecoration: 'underline',
    },
  },
};

export default compose(
  Radium,
)(MarkdownRendererLink);
