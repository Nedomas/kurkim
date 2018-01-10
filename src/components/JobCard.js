import React, { Component } from 'react';
import Radium from 'radium';
import _ from 'lodash';

class JobCard extends Component {
  render() {
    const {
      data: {
        fields: {
          title,
          city,
          shortDescription,
          companyName,
        },
      },
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
          <div style={[styles.img, { backgroundImage: `url('/designer.jpeg')` }]} />
        </div>

        <div style={styles.shortDescription}>
          {shortDescription}
        </div>

        <div style={styles.companyName}>
          {companyName}
        </div>
      </div>
    );
  }
}

export default Radium(JobCard);

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
    justifyContent: 'space-between',
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
    filter: 'grayscale(100%)',
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
