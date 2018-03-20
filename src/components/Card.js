import React, { Component } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import moment from 'moment';
import lt from 'moment/locale/lt';
import Measure from 'react-measure';
import plural from 'plural';
import { compose } from 'redux';
import windowSize from 'react-window-size';
import LazyLoad from 'react-lazyload';

import fluid from '@bloometry/fluid';
import step from '@bloometry/step';
import Container from './Container';
import Headline from './Headline';
import Text from './Text';
import CompanyLogo from './CompanyLogo';
import JobCard from './JobCard';
import SubscribeCard from './SubscribeCard';
import BlogPostCard from './BlogPostCard';

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

  childProps() {
    return {
      ...this.props,
      ...this.state,
      height: this.height(),
      onMouseEnter: () => this.handleMouseEnter(),
      onMouseLeave: () => this.handleMouseLeave(),
    };
  }

  height() {
    const {
      data: {
        type,
      },
      windowWidth,
    } = this.props;

    if (type !== 'subscribe') return this.state.height;

    return 400 + windowWidth / 15;
  }

  render() {
    const {
      data: {
        type,
      },
    } = this.props;

    const CARD_MAPPINGS = {
      job: JobCard,
      subscribe: SubscribeCard,
      blogPost: BlogPostCard,
    };

    const TagName = CARD_MAPPINGS[type];

    return (
      <LazyLoad height={this.height()} offset={200}>
        <TagName {...this.childProps()} />
      </LazyLoad>
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
