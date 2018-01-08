import React, { Component } from 'react';

export default class JobCard extends Component {
  render() {
    const {
      data: {
        fields: {
          title,
        },
      },
    } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.title}>
          {title}
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
  }
};
