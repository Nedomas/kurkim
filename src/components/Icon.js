import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';

import fluid from '@bloometry/fluid';
import colors from '../theme/colors';

import Container from './Container';

import { ReactComponent as city } from '../assets/city.svg';
import { ReactComponent as website } from '../assets/website.svg';
import { ReactComponent as link } from '../assets/link.svg';
import { ReactComponent as egg } from '../assets/egg-white.svg';
import { ReactComponent as imperfectOval } from '../assets/imperfect-oval-white.svg';
import { ReactComponent as oval } from '../assets/logo-oval-white.svg';
import { ReactComponent as dropdown } from '../assets/dropdown.svg';
import { ReactComponent as facebook } from '../assets/facebook.svg';
import { ReactComponent as instagram } from '../assets/instagram.svg';

const TYPES = {
  city,
  website,
  link,
  egg,
  imperfectOval,
  oval,
  dropdown,
  facebook,
  instagram,
};

class Icon extends Component {
  render() {
    const {
      type,
      medium,
      tiny,
      style,
      pad,
    } = this.props;

    const TagName = Radium(TYPES[type]);

    return (
      <Container
        component={TagName}
        {...this.props}
        style={[
          styles.container,
          medium && styles.medium,
          tiny && styles.tiny,
          style,
        ]}
      />
    );
  }
};

const styles = {
  container: {
    width: fluid(70, 100),
    height: fluid(70, 100),
    fill: colors.black,
  },
  medium: {
    width: fluid(40, 50),
    height: fluid(40, 50),
  },
  tiny: {
    width: fluid(16, 20),
    height: fluid(16, 20),
  },
};

export default compose(
  Radium,
)(Icon);
