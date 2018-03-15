import React, { Component } from 'react';
import Radium from 'radium';
import { compose } from 'redux';
import _ from 'lodash';

import step from '@bloometry/step';
import round from '@bloometry/round';
import colors from '../theme/colors';

class CompanyLogo extends Component {
  logoBackgroundColor() {
    const {
      company: {
        logoBackgroundColor,
      },
    } = this.props;

    if (!logoBackgroundColor) return colors.white;

    return `rgba(${_.values(JSON.parse(logoBackgroundColor)).join(', ')})`;
  }

  render() {
    const {
      company: {
        logo: {
          url,
        },
      },
      size = 200,
      chaos,
      style,
    } = this.props;

    return (
      <div style={[styles.container, chaos && styles.chaos.container, style]}>
        <div
          style={[
            {
              backgroundImage: `url('${url}')`,
              backgroundColor: this.logoBackgroundColor(),
              backgroundSize: `${size - size * 0.2}px`,
              width: `${size}px`,
              height: `${size}px`,
            },
            styles.img,
            chaos && styles.chaos.img,
          ]}
        />
      </div>
    );
  }
}

const styles = {
  img: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: round,
    margin: '0 auto',
  },
  container: {
    paddingBottom: step(2),
    marginBottom: step(1.5),
  },
  chaos: {
    container: {
      backgroundImage: 'url("/chaos-black.svg")',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    img: {
      border: `1px solid ${colors.black}`,
    },
  },
};


export default compose(
  Radium,
)(CompanyLogo);
