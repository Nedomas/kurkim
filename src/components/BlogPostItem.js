import React, { Component } from 'react';
import { compose } from 'redux';
import { Link as RouterLink } from 'react-router-dom';
import Radium from 'radium';
import windowSize from 'react-window-size';
import { lazyload } from 'react-lazyload';

import BlogPostAuthor from './BlogPostAuthor';
import BlogPostMeta from './BlogPostMeta';

import Headline from './Headline';
import Container from './Container';
import Text from './Text';
import step from '@bloometry/step';
import colors from '../theme/colors';
import isSmall from '../theme/isSmall';
import fluid from '@bloometry/fluid';
import borderRadius from '../theme/borderRadius';
import imageUrl from '../theme/imageUrl';

const Link = Radium(RouterLink);

class BlogPostItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  handleMouseEnter() {
    this.setState({ hover: true });
  }

  handleMouseLeave() {
    this.setState({ hover: false });
  }

  render() {
    const {
      blogPost,
      blogPost: {
        headline,
        slug,
        teaser,
        displayImage,
        author,
      },
    } = this.props;

    const {
      hover,
    } = this.state;

    return (
      <Link
        to={`/t/${slug}`}
        style={styles.container}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        <div
          style={[
            styles.displayImage,
            {
              backgroundImage: `url('${imageUrl(displayImage, { height: 800 })}')`
            },
          ]}
        />
        <Container pad marginTopRaw={fluid(-100, -200)}
          marginLeft={isSmall(this) ? 0.5 : 2}
          marginRight={isSmall(this) ? 0.5 : 2}
          style={styles.content}
        >
          <Headline bold level={3} underline={hover}>
            {headline}
          </Headline>
          <BlogPostMeta blogPost={blogPost} />

          <Text grey level={2} padBottom>
            {teaser}
          </Text>

          <BlogPostAuthor author={author} />
        </Container>
      </Link>
    );
  }
};

const styles = {
  container: {
    color: colors.black,
    textDecoration: 'none',
    display: 'block',
    // maxWidth: fluid(800, 900),
    marginBottom: step(5),
    borderRadius,
  },
  displayImage: {
    width: '100%',
    height: fluid(200, 400),
    backgroundSize: 'cover',
    borderRadius,
  },
  content: {
    border: `1px solid ${colors.lightLightBlack}`,
    borderRadius,
    backgroundColor: colors.white,
  },
};

export default compose(
  windowSize,
  lazyload({
    once: true,
    offset: 200,
  }),
  Radium,
)(BlogPostItem);
