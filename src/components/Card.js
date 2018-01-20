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
        <div style={styles.blocks.middle}>
          <div style={[styles.img, { backgroundImage: `url('${this.mainPhotoUrl()}')` }]} />
        </div>

        <div style={styles.type}>
          {this.category()}
        </div>

        <div style={styles.blocks.top}>
          <div style={[styles.title, hover && styles.hover.title]}>
            {this.title()}
          </div>
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
    // border: '2px solid #000',
    width: '30%',
    padding: '50px 0 10px',
    margin: '0 15px',
    // margin: '15px 0',
    fontFamily: '"HK Grotesk"',
    // display: 'flex',
    // flexDirection: 'column',
    color: '#000',
    textDecoration: 'none',
    borderBottom: '1px solid #E6E6E6',
  },
  title: {
    fontFamily: '"HK Grotesk"',
    // letterSpacing: '1.1px',
    // padding: '20px 0',
    paddingBottom: '10px',
    fontSize: '20px',
    textTransform: 'uppercase',
  },
  type: {
    textTransform: 'uppercase',
    letterSpacing: '.1em',
    padding: '20px 0 0',
    fontFamily: '"HK Grotesk"',
    fontSize: '12px',
  },
  shortDescription: {
    // padding: '0 10px 0 0',
    fontSize: '14px',
    minHeight: '70px',
  },
  greyBlock: {
    paddingTop: '10px',
    color: 'grey',
    // textAlign: 'right',
  },
  img: {
    width: '100%',
    height: '200px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: '0 auto',
    mixBlendMode: 'darken',
    filter: 'grayscale(100%) contrast(2)',
  },
  blocks: {
    top: {
      // height: '80px',
      // flexShrink: 0,
    },
    middle: {
      // backgroundColor: '#f1e3a0',
      background: 'linear-gradient(180deg, #F86E57, #f2e782)',
      // paddingTop: '30px',
      // height: '100px',
    },
    bottom: {
      paddingTop: '20px',
      // display: 'flex',
    },
  },
  hover: {
    title: {
      textDecoration: 'underline',
    },
  },
  person: {
    container: {
      // backgroundColor: '#F7FDF4',
    },
  },
};
