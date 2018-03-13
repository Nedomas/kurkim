import React, { Component } from 'react';

import step from '@bloometry/step';
import colors from '../../theme/colors';

export default class MarkdownRendererListItem extends Component {
  render() {
    const {
      children,
      ordered: _ordered,
      tight: _tight,
      ...rest,
    } = this.props;

    return (
      <li style={styles.container} {...rest}>
        <img style={styles.bulletpoint} src='/logo-oval-red-small.svg'/>
        {children}
      </li>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    padding: `${step(0.2)} 0`,
    width: '100%',
    alignItems: 'center',
  },
  bulletpoint: {
    height: '10px',
    paddingRight: '6px',
  },
};
