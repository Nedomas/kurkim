import React, { Component } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import moment from 'moment';
import lt from 'moment/locale/lt';

moment.locale('lt');

class EventCard extends Component {
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
        <div style={styles.type}>
          Renginys 💃
        </div>

        <div style={styles.blocks.top}>
          <div style={styles.title}>
            {title}
          </div>
          <div style={styles.city}>
            {city}
          </div>
        </div>

        <div style={styles.blocks.middle}>
          <div style={[styles.img, { backgroundImage: `url('${this.mainPhotoUrl()}')` }]} />
        </div>
        <div style={styles.shortDescription}>
          Visiems norintiems susipažinti su klounados pagrindais
        </div>
        <div style={styles.date}>
          {_.capitalize(moment(startDate).format('MMMM D'))}d.
        </div>
      </div>
    );
  }
}

export default Radium(EventCard);

const styles = {
  container: {
    height: '350px',
    border: '3px solid #000',
    width: '220px',
    padding: '20px',
    margin: '0 15px',
    fontFamily: '"CT Cinetype"',
  },
  title: {
    fontWeight: 600,
    letterSpacing: '1.1px',
    padding: '0 10px 10px 0',
    paddingBottom: '10px',
    fontSize: '20px',
    textTransform: 'uppercase',
  },
  date: {
    paddingTop: '10px',
    color: 'grey',
  },
  shortDescription: {
    fontSize: '14px',
    paddingRight: '20px',
  },
  city: {
  },
  img: {
    width: '80px',
    height: '80px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: '0 auto',
    filter: 'grayscale(100%)',
  },
  type: {
    textTransform: 'uppercase',
    fontSize: '14px',
    paddingBottom: '30px',
  },
  blocks: {
    top: {
      height: '100px',
    },
    middle: {
      height: '100px',
    },
  },
};
