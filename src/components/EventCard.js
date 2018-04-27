import React, { Component } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import moment from 'moment';
import { compose } from 'redux';
import windowSize from 'react-window-size';
import { Link } from 'react-router-dom';
import twix from 'twix';

import step from '@bloometry/step';
import Headline from './Headline';
import Text from './Text';
import Container from './Container';

import formatJobHeadline from '../helpers/formatJobHeadline';

import borderRadius from '../theme/borderRadius';
import colors from '../theme/colors';
import imageUrl from '../theme/imageUrl';
moment.locale('lt');

class EventCard extends Component {
  render() {
    const {
      width,
      data: {
        headline,
        cities,
        displayImage,
        rsvpLink,
        startTime,
        endTime,
      },
      hover,
      height,
    } = this.props;

    return (
      <Container
        {...this.props}
        component={Link}
        to={rsvpLink}
        style={[styles.container, { height: `${height}px` }]}
        target='_blank'
      >
        <div
          style={[
            styles.imageContainer,
            {
              backgroundImage: `url('${imageUrl(displayImage, { height, width, quality: 70 })}')`,
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
            <Container>
              <Text level={2} uppercase color={colors.yellow} bold>
                Renginys:
              </Text>
              <Headline level={3}>
                {formatJobHeadline(headline)}
              </Headline>
            </Container>
            <Container>
              <Text medium level={2} tight block>
                {_.capitalize(moment(startTime).twix(endTime).format())}
              </Text>
              <Text block>
                {_.map(cities, 'name').join(', ')}
              </Text>
            </Container>
          </Container>
        </div>
      </Container>
    );
  }
}

export default compose(
  windowSize,
  Radium,
)(EventCard);

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
    backgroundColor: colors.yellow,
  },
  gradientContainer: {
    position: 'absolute',
    width: '100%',
    background: `linear-gradient(${colors.black}, ${colors.tintBlack}, ${colors.black})`,
    opacity: 0.8,
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
