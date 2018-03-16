import React, { Component } from 'react';
import { compose } from 'redux';
import { Link as RouterLink } from 'react-router-dom';
import Radium from 'radium';
import _ from 'lodash';

import BlogPostAuthor from './BlogPostAuthor';
import BlogPostMeta from './BlogPostMeta';

import Headline from './Headline';
import Text from './Text';
import step from '@bloometry/step';
import colors from '../theme/colors';
import fluid from '@bloometry/fluid';
import borderRadius from '../theme/borderRadius';

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
        to={`/blog/${slug}`}
        style={styles.container}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        <div
          style={[
            styles.displayImage,
            {
              backgroundImage: `url('${_.get(displayImage, 'url')}')`
            },
          ]}
        />
        <div style={styles.content}>
          <Headline bold level={3} underline={hover}>
            {headline}
          </Headline>
          <BlogPostMeta blogPost={blogPost} />

          <Text grey level={2} padBottom>
            {teaser}
          </Text>

          <BlogPostAuthor author={author} />
        </div>
      </Link>
    );
  }
};

const styles = {
  container: {
    color: colors.black,
    textDecoration: 'none',
    display: 'block',
    maxWidth: fluid(800, 900),
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
    margin: `${fluid(-100, -200)} ${step(2)} 0`,
    backgroundColor: colors.white,
    padding: step(2),
  },
};

export default compose(
  Radium,
)(BlogPostItem);
