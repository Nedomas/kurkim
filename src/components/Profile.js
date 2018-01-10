import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import {
  load as loadProfile,
} from '../modules/profile';

import {
  load as loadProfileMainPhoto,
} from '../modules/profileMainPhoto';

import Card from './Card';
import Splash from './Splash';

class Profile extends Component {
  componentDidMount() {
    this.props.handleLoadProfile(this.props.match.params.personId)
      .then(() => this.props.handleLoadProfileMainPhoto());
  }

  fullName() {
    return `${this.profileFields().firstName} ${this.profileFields().lastName}`;
  }

  profileFields() {
    const {
      profile: {
        data: {
          fields,
        },
      },
    } = this.props;

    return fields;
  }

  mainPhotoUrl() {
    if (!this.props.profileMainPhoto.loaded) return;

    const {
      profileMainPhoto: {
        data: {
          fields: {
            file: {
              url,
            },
          },
        },
      },
    } = this.props;

    return url;
  }

  render() {
    if (this.props.profile.loading) return '';

    return (
      <div style={styles.container}>
        <div style={styles.blocks.top}>
          <div style={styles.mainPhoto.container}>
            <img src={this.mainPhotoUrl()} style={styles.mainPhoto.img} />
          </div>

          <div style={styles.content.container}>
            <div style={styles.title}>
              {this.fullName()}
            </div>
            <div style={styles.city}>
              {this.profileFields().city}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 auto',
    padding: '40px 120px',
  },
  blocks: {
    top: {
      display: 'flex',
    },
  },
  mainPhoto: {
    container: {
      width: '30%',
      maxWidth: '500px',
      marginRight: '50px',
    },
    img: {
      width: '100%',
    },
  },
  content: {
    container: {
    },
  },
  title: {
    fontSize: '60px',
    margin: '-15px 0 0 -6px',
  },
}

export default connect(state => ({
  profile: state.profile,
  profileMainPhoto: state.profileMainPhoto,
}), {
  handleLoadProfile: loadProfile,
  handleLoadProfileMainPhoto: loadProfileMainPhoto,
})(Profile);
