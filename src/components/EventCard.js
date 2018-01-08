import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import lt from 'moment/locale/lt';

moment.locale('lt');

export default class EventCard extends Component {
  mainPhotoUrl() {
    if (!this.mainPhoto()) return;

    const {
      fields: {
        file: {
          url,
        },
      },
    } = this.mainPhoto();

    return url;
  }

  mainPhoto() {
    const {
      data: {
        fields: {
          mainPhoto: {
            sys: {
              id,
            },
          },
        },
      },
      includes: {
        Asset,
      },
    } = this.props;

    return _.find(Asset, { sys: { id } });
  }

  render() {
    const {
      data: {
        fields: {
          title,
          startDate,
          city,
        },
      },
    } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.title}>
          {title}
        </div>
        <div>
          {_.capitalize(moment(startDate).format('MMMM D'))}d.
        </div>
        <div>
          {city}
        </div>
        <div>
          <img src={this.mainPhotoUrl()} style={styles.img} />
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundColor: 'hsla(41, 28%, 97%, 1.0)',
    height: '300px',
    width: '200px',
    padding: '20px',
    margin: '0 10px',
  },
  title: {
    fontWeight: 600,
    paddingBottom: '10px',
    fontSize: '20px'
  },
  city: {
    color: 'grey',
  },
  img: {
    width: '100%',
  },
};
