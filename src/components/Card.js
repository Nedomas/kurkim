import React, { Component } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import moment from 'moment';
import PersonCard from './PersonCard';
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
moment.locale('lt');

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  category() {
    if (this.isJob()) {
      return 'Ieškomas';
    } else if (this.isEvent()) {
      return 'Renginys';
    } else if (this.isPerson()) {
      return 'Profilis';
    } else {
      return 'Kažkas';
    }
  }

  isJob() {
    return this.props.data.__typename === 'Job';
  }

  isEvent() {
    return this.props.data.__typename === 'Event';
  }

  isPerson() {
    return this.props.data.__typename === 'Person';
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
        id,
      },
    } = this.props;

    return `${_.kebabCase(plural(__typename))}/${id}`;
  }

  render() {
    const {
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
      last,
    } = this.props;

    const {
      hover,
    } = this.state;

    const isIsSingleColumn = this.props.windowWidth <= 600;

    return (
      <a
        href={this.href()}
        style={[styles.container, last && !isIsSingleColumn && styles.last.container]}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        <div
          style={[
            styles.imageContainer,
            {
              backgroundImage: `url("${_.get(displayImage, 'url')}")`,
            },
            hover && styles.hover.imageContainer,
          ]}
        />
        <div style={[
          styles.gradientContainer,
          hover && styles.hover.gradientContainer,
        ]} />

        <div style={styles.contentContainer}>
          <Container style={styles.innerContainer}>
            <Headline tier={3}>
              {headline}
            </Headline>
            <div style={styles.company.container}>
              <div>
                <CompanyLogo company={company} size={50} style={styles.company.logo} />
              </div>

              <div style={styles.company.name}>
                <Text bold tier={3}>
                  {name}
                </Text>
                <Text tier={4}>
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

const styles = {
  container: {
    display: 'flex',
    position: 'relative',
    height: '350px',
    width: '100%',
    borderRadius,
  },
  imageContainer: {
    position: 'absolute',
    width: '300px',
    height: '350px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius,
  },
  gradientContainer: {
    position: 'absolute',
    width: '300px',
    height: '350px',
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
    height: '320px',
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
