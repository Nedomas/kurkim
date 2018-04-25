import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import step from '@bloometry/step';
import { compose } from 'redux';
import windowSize from 'react-window-size';

import CompanyLogo from './CompanyLogo';
import Container from './Container';

import imageUrl from '../theme/imageUrl';
import isSmall from '../theme/isSmall';

class CompanyLogoWithBorder extends Component {
  render() {
    const {
      company: {
        slug,
        displayImage,
      },
      company,
    } = this.props;

    const companyLogoBorderSize = isSmall(this) ? 120 : 220;

    return (
      <Container component={Link} to={`/i/${slug}`} style={styles.background.container}>
        <Container style={[
          styles.background.content,
          {
            backgroundImage: `url('${imageUrl(displayImage, { height: companyLogoBorderSize, width: companyLogoBorderSize, quality: 70, fit: "scale" }, true)}')`,
            height: `${companyLogoBorderSize}px`,
            width: `${companyLogoBorderSize}px`,
          },
        ]}>
          <CompanyLogo company={company} style={styles.logo} />
        </Container>
      </Container>
    );
  }
};

const styles = {
  logo: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  background: {
    container: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    content: {
      marginBottom: step(2),
      backgroundSize: 'cover',
      borderRadius: '999px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
};

export default compose(
  windowSize,
)(CompanyLogoWithBorder);
