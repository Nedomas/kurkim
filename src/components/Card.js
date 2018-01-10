import React, { Component } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import moment from 'moment';
import lt from 'moment/locale/lt';
moment.locale('lt');

class Card extends Component {
  greyBlock() {
    const {
      data: {
        sys: {
          contentType: {
            sys: {
              id,
            },
          },
        },
        fields: {
          companyName,
          date,
        },
      },
    } = this.props;

    if (id == 'job') {
      return companyName;
    } else if (id == 'event') {
      return `${_.capitalize(moment(date).format('MMMM D'))}d.`;
    } else {
      return <div>Unknown type</div>
    }
  }

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
    console.log(this.props);

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
        sys: {
          contentType: {
            sys: {
              id,
            },
          },
        },
      },
      data: {
        fields: {
          title,
          city,
          shortDescription,
        },
      },
      includes,
    } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.type}>
          Darbas
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

        <div style={styles.blocks.bottom}>
          <div style={styles.shortDescription}>
            {shortDescription}
          </div>

          <div style={styles.companyName}>
            {this.greyBlock()}
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(Card);

const styles = {
  container: {
    height: '350px',
    border: '3px solid #000',
    width: '220px',
    padding: '20px 20px 13px',
    margin: '0 15px',
    fontFamily: 'SF Mono',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 600,
    letterSpacing: '1.1px',
    padding: '0 10px 10px 0',
    paddingBottom: '10px',
    fontSize: '20px',
    textTransform: 'uppercase',
  },
  type: {
    textTransform: 'uppercase',
    fontSize: '14px',
    paddingBottom: '30px',
  },
  shortDescription: {
    padding: '0 20px 0 0',
    fontSize: '14px',
  },
  companyName: {
    paddingTop: '10px',
    color: 'grey',
  },
  img: {
    width: '80px',
    height: '80px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: '0 auto',
    // filter: 'grayscale(100%)',
  },
  blocks: {
    top: {
      height: '80px',
      flexShrink: 0,
    },
    middle: {
      paddingTop: '30px',
      height: '100px',
    },
    bottom: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      paddingTop: '20px',
    },
  },
};
