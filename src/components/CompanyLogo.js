import React, { Component } from 'react';
import Radium from 'radium';
import { compose } from 'redux';
import _ from 'lodash';

import step from '@bloometry/step';
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
    } = this.props;

    return (
      <div style={styles.container}>
        <div
          style={[
            {
              backgroundImage: `url('${url}')`,
              backgroundColor: this.logoBackgroundColor(),
            },
            styles.img,
          ]}
        />
      </div>
    );
  }
}

const styles = {
  img: {
    backgroundSize: '160px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: '9999999999px',
    border: `1px solid ${colors.black}`,
    width: '200px',
    height: '200px',
    margin: '0 auto',
  },
  container: {
    backgroundImage: 'url("/chaos-black.svg")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    paddingBottom: step(2),
    marginBottom: step(1.5),
  },
};


export default compose(
  Radium,
)(CompanyLogo);
