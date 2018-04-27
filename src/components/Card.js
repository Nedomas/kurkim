import React, { Component } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import { compose } from 'redux';
import windowSize from 'react-window-size';
import LazyLoad from 'react-lazyload';

import JobCard from './JobCard';
import SubscribeCard from './SubscribeCard';
import BlogPostCard from './BlogPostCard';
import EventCard from './EventCard';

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

    return 400 + windowWidth / 12;
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
      event: EventCard,
    };

    const TagName = CARD_MAPPINGS[type];

    return (
      <LazyLoad height={this.height()} offset={600}>
        <TagName {...this.childProps()} />
      </LazyLoad>
    );
  }
}

export default compose(
  windowSize,
  Radium,
)(Card);
