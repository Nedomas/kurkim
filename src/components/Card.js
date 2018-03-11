import React, { Component } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import moment from 'moment';
import PersonCard from './PersonCard';
import lt from 'moment/locale/lt';
import Measure from 'react-measure';
import plural from 'plural';
moment.locale('lt');

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      titleHeight: 0,
    };
  }

  category() {
    if (this.isJob()) {
      return 'Ieškomas';
    } else if (this.isEvent()) {
      return 'Renginys';
    } else if (this.isPerson()) {
      return 'Profilis';
    } else {
      return 'Kažkas';
    }
  }

  isJob() {
    return this.props.data.__typename === 'Job';
  }

  isEvent() {
    return this.props.data.__typename === 'Event';
  }

  isPerson() {
    return this.props.data.__typename === 'Person';
  }

  handleMouseEnter() {
    this.setState({ hover: true });
  }

  handleMouseLeave() {
    this.setState({ hover: false });
  }

  personHref() {
    const {
      data: {
        sys: {
          id,
        },
      },
    } = this.props;

    return `/profile/${id}`;
  }

  href() {
    const {
      data: {
        __typename,
        id,
      },
    } = this.props;

    return `${_.kebabCase(plural(__typename))}/${id}`;
  }

  render() {
    const {
      data: {
        __typename,
        id,
        headline,
        city,
        teaser,
      },
    } = this.props;

    const {
      hover,
      titleHeight,
    } = this.state;
    console.log(titleHeight);

    if (this.isPerson()) return <PersonCard {...this.props} />;

    return (
      <a
        href={this.href()}
        style={[styles.container, this.isPerson() && styles.person.container]}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        <div style={[styles.blocks.middle, styles.blocks[__typename], hover && styles.hover.blocks[__typename]]}>
          <div style={[styles.title, hover && styles.hover.title]}>
            {headline}
          </div>
        </div>

        <div style={styles.topContainer}>
          <div style={styles.category}>
            {this.category()}
          </div>
          <div>
            {city}
          </div>
        </div>

        <div style={styles.blocks.bottom}>
          <div style={styles.shortDescription}>
            {teaser}
          </div>
        </div>
      </a>
    );
  }
}

export default Radium(Card);

const styles = {
  container: {
    // border: '2px solid #000',
    width: '30%',
    minWidth: '300px',
    padding: '0 0 10px',
    margin: '0 15px 50px',
    // margin: '15px 0',
    // display: 'flex',
    // flexDirection: 'column',
    color: '#888888',
    textDecoration: 'none',
    boxShadow: '5px 5px 0 hsla(0, 0%, 0%, 0.1)',
    border: '1px solid #EBEAEC',
    // borderBottom: '1px solid #E6E6E6',
  },
  title: {
    // color: '#000',
    color: '#fff',
    // letterSpacing: '1.1px',
    // padding: '20px 0',
    letterSpacing: '-1px',
    padding: '10px 0 0',
    fontSize: '30px',
    lineHeight: '30px',
    marginLeft: '-2px',
    textTransform: 'capitalize',
  },
  topContainer: {
    textTransform: 'uppercase',
    letterSpacing: '.1em',
    padding: '20px 10px 10px',
    fontSize: '12px',
    color: '#888888',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    border: '1px solid #888888',
    padding: '2px 5px 1px',
  },
  shortDescription: {
    // padding: '0 10px 0 0',
    fontSize: '18px',
    // minHeight: '70px',
  },
  greyBlock: {
    // paddingTop: '10px',
    color: 'grey',
    // textAlign: 'right',
  },
  img: {
    width: '100%',
    height: '170px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: '0 auto',
    opacity: '.8',
    // mixBlendMode: 'darken',
    // filter: 'grayscale(100%) contrast(1.5)',
  },
  blocks: {
    Job: {
      backgroundColor: '#8CDBDF',
    },
    Event: {
      backgroundColor: '#FDB19A',
    },
    top: {
      // backgroundColor: 'red',
      // minHeight: '130px',
    },
    middle: {
      height: '150px',
      padding: '10px 20px',
    },
    bottom: {
      padding: '10px',
    },
  },
  hover: {
    title: {
      // textDecoration: 'underline',
    },
    blocks: {
      Job: {
        // backgroundColor: 'hsla(183, 56%, 71%, 1)',
        backgroundColor: 'hsla(183, 80%, 71%, 1)',
      },
      Event: {
        // backgroundColor: 'hsla(14, 96%, 80%, 1)',
        backgroundColor: 'hsla(14, 100%, 70%, 1)',
      },
    },
  },
  person: {
    container: {
      // backgroundColor: '#F7FDF4',
    },
  },
  seperator: {
    fontFamily: 'Apercu Pro',
    color: '#000',
    // letterSpacing: '1.1px',
    // padding: '20px 0',
    fontSize: '60px',
    lineHeight: '50px',
    textTransform: 'capitalize',
  },
};
