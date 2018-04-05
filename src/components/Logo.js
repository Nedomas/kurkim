import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';
import { Link as RouterLink } from 'react-router-dom';

import colors from '../theme/colors';

const Link = Radium(RouterLink);

class Logo extends Component {
  render() {
    const {
      dark,
      style,
    } = this.props;

    return (
      <Link to='/' style={[styles.container, dark && styles.dark.container, style]}>
        Kurkim
      </Link>
    );
  }
};

const styles = {
  container: {
    fontSize: '20px',
    lineHeight: '60px',
    color: '#fff',
    display: 'block',
    textDecoration: 'none',
    backgroundImage: 'url("/logo-oval-white.svg")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    paddingLeft: '30px',
  },
  dark: {
    container: {
      color: colors.black,
      backgroundImage: 'url("/logo-oval-black.svg")',
    },
  },
};

export default compose(
  Radium,
)(Logo);
