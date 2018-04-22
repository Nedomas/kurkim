import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';
import Radium from 'radium';

import Navbar from './Navbar';
import Container from './Container';
import Footer from './Footer';
import Markdown from './Markdown';
import FullScreenLoading from './FullScreenLoading';

const facebookMessengerSource = `
  <!-- Load Facebook SDK for JavaScript -->
  <div id="fb-root"></div>
  <script>(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));</script>

  <!-- Your customer chat code -->
  <div class="fb-customerchat"
    page_id="185075165567392"
    theme_color="#71ABE2"
    minimized="true"
    logged_in_greeting="Labas! Gal turi klausimų?"
    logged_out_greeting="Labas! Gal turi klausimų?">
  </div>
`;

class About extends Component {
  render() {
    const {
      data: {
        loading,
      },
    } = this.props;

    if (loading) return <FullScreenLoading />;

    const {
      data: {
        CustomText: {
          content,
        },
      },
    } = this.props;

    return (
      <div>
        <Navbar dark {...this.props} />

        <Container pad dark middle>
          <Container center limited>
            <Markdown source={content} />
          </Container>
        </Container>

        <Footer {...this.props} />
        <div dangerouslySetInnerHTML={{
          __html: facebookMessengerSource,
        }}/>
      </div>
    );
  }
}

const AboutQuery = gql`
  query AboutQuery {
    CustomText(slug: "about") {
      content
    }
  }
`;

export default compose(
  graphql(AboutQuery),
  Radium,
)(About);
