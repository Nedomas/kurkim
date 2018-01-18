import React, { Component } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import moment from 'moment';
import lt from 'moment/locale/lt';
moment.locale('lt');

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
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
    } = this.state;

    return (
      <a
        href={this.href()}
        style={[styles.container, this.isPerson() && styles.person.container]}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        <div style={styles.type}>
          {this.category()}
        </div>

        <div style={styles.blocks.top}>
          <div style={[styles.title, hover && styles.hover.title]}>
            {this.title()}
          </div>
        </div>

        <div style={styles.blocks.middle}>
          <div style={[styles.img, { backgroundImage: `url('${this.mainPhotoUrl()}')` }]} />
        </div>

        <div style={styles.blocks.bottom}>
          <div style={styles.shortDescription}>
            {shortDescription}
          </div>

          <div style={styles.greyBlock}>
            {this.greyBlock()}
          </div>
        </div>
      </a>
    );
  }
}

export default Radium(Card);

const styles = {
  container: {
    height: '350px',
    border: '2px solid #000',
    width: '220px',
    padding: '20px 20px 13px',
    margin: '15px 15px',
    fontFamily: '"Lab Grotesque"',
    display: 'flex',
    flexDirection: 'column',
    color: '#000',
    textDecoration: 'none',
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
    // padding: '0 10px 0 0',
    fontSize: '14px',
  },
  greyBlock: {
    paddingTop: '10px',
    color: 'grey',
    textAlign: 'center',
  },
  img: {
    width: '120px',
    height: '120px',
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
      // paddingTop: '30px',
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
  hover: {
    title: {
      textDecoration: 'underline',
    },
  },
  person: {
    container: {
      backgroundColor: '#F7FDF4',
    },
  },
};
