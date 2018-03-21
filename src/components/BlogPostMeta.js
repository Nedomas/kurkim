import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';
import moment from 'moment';
import _ from 'lodash';

import colors from '../theme/colors';
import fluid from '@bloometry/fluid';
import Text from './Text';

class BlogPostMeta extends Component {
  render() {
    const {
      blogPost: {
        publishedAt,
        timeToRead,
      },
    } = this.props;

    return (
      <Text grey padBottom {...this.props}>
        {_.capitalize(moment(publishedAt).format('MMM D, YYYY'))} | {timeToRead} skaitymo
      </Text>
    );
  }
};

export default compose(
  Radium,
)(BlogPostMeta);
