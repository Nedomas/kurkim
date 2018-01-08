import React, { Component } from 'react';

import JobCard from './JobCard';
import EventCard from './EventCard';

export default class Card extends Component {
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
      data,
      includes,
    } = this.props;

    console.log(this.props);
    if (id == 'job') {
      return <JobCard data={data} includes={includes} />
    } else if (id == 'event') {
      return <EventCard data={data} includes={includes} />
    } else {
      return <div>Unknown type {id}</div>
    }
  }
}
