import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';
import FacebookProvider, { Share } from 'react-facebook';

class FacebookShareButton extends Component {
  render() {
    return (
      <FacebookProvider appId="1869305930009479">
        <Share href="http://www.facebook.com">
          <button type="button">Share</button>
        </Share>
      </FacebookProvider>
    );
  }
};

export default compose(
  Radium,
)(FacebookShareButton);
