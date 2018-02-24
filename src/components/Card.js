import React, { Component } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import moment from 'moment';
import PersonCard from './PersonCard';
import lt from 'moment/locale/lt';
import Measure from 'react-measure';
moment.locale('lt');

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      titleHeight: 0,
    };
  }

  type() {
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
    } = this.props;

    return id;
  }

  category() {
    if (this.type() === 'job') {
      return 'Ieškomas';
    } else if (this.type() === 'event') {
      return 'Renginys';
    } else if (this.type() === 'person') {
      return 'Profilis';
    } else {
      return 'Kažkas';
    }
  }

  isJob() {
    return this.type() === 'job';
  }

  isEvent() {
    return this.type() === 'event';
  }

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
          city,
        },
      },
    } = this.props;

    return city;
    // if (id === 'job') {
    //   return companyName;
    // } else if (id === 'event') {
    //   return `${_.capitalize(moment(date).format('MMMM D'))}d.`;
    // }
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
    const id = _.get(this.props, 'data.fields.mainPhoto.sys.id');
    const Asset = _.get(this.props, 'includes.Asset');

    return _.find(Asset, { sys: { id } });
  }

  handleMouseEnter() {
    this.setState({ hover: true });
  }

  handleMouseLeave() {
    this.setState({ hover: false });
  }

  title() {
    const {
      data: {
        fields: {
          title,
          firstName,
          lastName,
        },
      },
    } = this.props;

    if (this.isPerson()) return `${firstName} ${lastName}`;

    return title;
  }

  isPerson() {
    return this.type() === 'person';
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
    if (this.isPerson()) return this.personHref();

    const {
      data: {
        fields: {
          link,
        },
      },
    } = this.props;

    return link;
  }

  render() {
    const {
      data: {
        fields: {
          title,
          city,
          shortDescription,
        },
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
        <div style={[styles.blocks.middle, styles.blocks[this.type()]]}>
          <div style={[styles.title, hover && styles.hover.title]}>
            {this.title()}
          </div>
        </div>

        <div style={styles.topContainer}>
          <div style={styles.category}>
            {this.category()}
          </div>
          <div>
            {this.greyBlock()}
          </div>
        </div>

        <div style={styles.blocks.bottom}>
          <div style={styles.shortDescription}>
            {shortDescription}
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
    padding: '20px 0 10px',
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
    job: {
      backgroundColor: '#415BFB',
    },
    event: {
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
      paddingTop: '10px',
    },
  },
  hover: {
    title: {
      // textDecoration: 'underline',
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
