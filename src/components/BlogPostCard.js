import React, { Component } from 'react';
import Radium from 'radium';
import { compose } from 'redux';
import windowSize from 'react-window-size';

import step from '@bloometry/step';
import Container from './Container';
import Headline from './Headline';
import BlogPostAuthor from './BlogPostAuthor';
import BlogPostMeta from './BlogPostMeta';

import borderRadius from '../theme/borderRadius';
import colors from '../theme/colors';
import imageUrl from '../theme/imageUrl';

class BlogPostCard extends Component {
  href() {
    const {
      data: {
        slug,
      },
    } = this.props;

    return `/t/${slug}`;
  }

  render() {
    const {
      width,
      data,
      data: {
        headline,
        cardTeaser,
        displayImage,
        author,
      },
      hover,
      height,
    } = this.props;

    return (
      <a
        {...this.props}
        href={this.href()}
        style={[styles.container, { height: `${height}px` }]}
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
            <div style={styles.teaser.container}>
              <BlogPostMeta blogPost={data} padBottom={0} color={colors.white} />
              <Headline level={4}>
                {cardTeaser}
              </Headline>

              <BlogPostAuthor author={author} light tiny />
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
)(BlogPostCard);

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
  teaser: {
    container: {
      // display: 'flex',
      // alignItems: 'center',
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
