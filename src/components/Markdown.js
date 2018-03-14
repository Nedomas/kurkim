import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';
import ReactMarkdown from 'react-markdown';

import Text from './Text';

import MarkdownRendererImage from './MarkdownRenderers/Image';
import MarkdownRendererLink from './MarkdownRenderers/Link';
import MarkdownRendererList from './MarkdownRenderers/List';
import MarkdownRendererListItem from './MarkdownRenderers/ListItem';
import MarkdownRendererParagraph from './MarkdownRenderers/Paragraph';

const RENDERERS = {
  image: MarkdownRendererImage,
  link: MarkdownRendererLink,
  list: MarkdownRendererList,
  listItem: MarkdownRendererListItem,
  paragraph: MarkdownRendererParagraph,
};

class Markdown extends Component {
  render() {
    return (
      <Text>
        <ReactMarkdown
          escapeHtml={false}
          renderers={RENDERERS}
          {...this.props}
        />
      </Text>
    );
  }
};

export default compose(
  Radium,
)(Markdown);
