import React, { Component } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import moment from 'moment';
import lt from 'moment/locale/lt';
import Measure from 'react-measure';
import plural from 'plural';
import { compose } from 'redux';
import windowSize from 'react-window-size';

import step from '@bloometry/step';
import Container from './Container';
import Headline from './Headline';
import Text from './Text';
import CompanyLogo from './CompanyLogo';

import borderRadius from '../theme/borderRadius';
import colors from '../theme/colors';
import imageUrl from '../theme/imageUrl';
moment.locale('lt');

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      height: _.sample([350, 400, 450]),
    };
  }

  handleMouseEnter() {
    this.setState({ hover: true });
  }

  handleMouseLeave() {
    this.setState({ hover: false });
  }

  href() {
    const {
      data: {
        __typename,
        slug: jobSlug,
        company: {
          slug: companySlug,
        },
      },
    } = this.props;

    const mapping = {
      Job: 'i',
    };

    return `/${mapping[__typename]}/${companySlug}/${jobSlug}`;
  }

  render() {
    const {
      width,
      data: {
        __typename,
        id,
        headline,
        cities,
        teaser,
        company,
        company: {
          name,
          displayImage,
        },
      },
    } = this.props;

    const {
      hover,
      height,
    } = this.state;

    return (
      <a
        href={this.href()}
        style={[styles.container, { height: `${height}px` }]}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        <div
          style={[
            styles.imageContainer,
            {
              backgroundImage: `url('${imageUrl(displayImage, { height, width })}')`,
              height: `${height}px`,
            },
            hover && styles.hover.imageContainer,
          ]}
        />
        <div style={[
          styles.gradientContainer,
          hover && styles.hover.gradientContainer,
          { height: `${height}px` },
        ]} />

        <div style={styles.contentContainer}>
          <Container style={[styles.innerContainer, { height: `${height - height * 0.08}px` }]}>
            <Headline level={3}>
              {headline}
            </Headline>
            <div style={styles.company.container}>
              <div>
                <CompanyLogo company={company} size={50} style={styles.company.logo} />
              </div>

              <div style={styles.company.name}>
                <Text medium level={2} tight>
                  {name}
                </Text>
                <Text>
                  {_.map(cities, 'name').join(', ')}
                </Text>
              </div>
            </div>
          </Container>
        </div>
      </a>
    );
  }
}

export default compose(
  windowSize,
  Radium,
)(Card);

const cardHeight = 400;

const styles = {
  container: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    borderRadius,
  },
  imageContainer: {
    position: 'absolute',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius,
  },
  gradientContainer: {
    position: 'absolute',
    width: '100%',
    background: `linear-gradient(${colors.black}, ${colors.tintBlack}, ${colors.black})`,
    opacity: 0.7,
    borderRadius,
  },
  contentContainer: {
    position: 'absolute',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: colors.white,
    padding: step(),
  },
  company: {
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    logo: {
      marginBottom: 0,
      paddingBottom: 0,
    },
    name: {
      paddingLeft: step(),
    },
  },
  last: {
    container: {
      marginRight: `calc(300px + ${step(1.5)})`,
    },
  },
  hover: {
    imageContainer: {
      filter: 'saturate(200%)',
    },
    gradientContainer: {
      opacity: 0.3,
    },
  },
};
