import React, { Component } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import moment from 'moment';
import lt from 'moment/locale/lt';
moment.locale('lt');

class PersonCard extends Component {
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

  fullName() {
    const {
      data: {
        fields: {
          firstName,
          lastName,
        },
      },
    } = this.props;

    return `${firstName} ${lastName}`;
  }

  title() {
    const {
      data: {
        fields: {
          title,
        },
      },
    } = this.props;

    return title;
  }

  href() {
    const {
      data: {
        sys: {
          id,
        },
      },
    } = this.props;

    return `/profile/${id}`;
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
        style={styles.container}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        <div style={styles.blocks.middle}>
          <div style={[styles.img, { backgroundImage: `url('${this.mainPhotoUrl()}')` }]} />
        </div>

        <div style={styles.content}>
          <div style={[styles.fullName, hover && styles.hover.fullName]}>
            {this.fullName()}
          </div>

          <div style={styles.title}>
            {this.title()}
          </div>
        </div>
      </a>
    );
  }
}

export default Radium(PersonCard);

const styles = {
  container: {
    // border: '2px solid #000',
    width: '30%',
    minWidth: '300px',
    padding: '0',
    margin: '0 15px 50px',
    // margin: '15px 0',
    // display: 'flex',
    // flexDirection: 'column',
    color: '#000',
    textDecoration: 'none',
  },
  fullName: {
    // fontFamily: '"HK Grotesk"',
    // letterSpacing: '1.1px',
    // padding: '20px 0',
    // paddingBottom: '10px',
    fontSize: '40px',
    lineHeight: '40px',
    fontFamily: 'Apercu Pro',
    marginLeft: '-2px',
    letterSpacing: '-1px',
    // textTransform: 'uppercase',
  },
  title: {
    // textTransform: 'uppercase',
    // letterSpacing: '.1em',
    padding: '0px 0 0',
    fontSize: '16px',
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
    height: '400px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: '0 auto',
    // mixBlendMode: 'darken',
    // filter: 'grayscale(100%) contrast(1)',
  },
  blocks: {
    top: {
      // height: '80px',
      // flexShrink: 0,
    },
    middle: {
      // backgroundColor: '#f1e3a0',
      // background: 'linear-gradient(180deg, #D1A072, #EFDBC1)',
      // background: 'linear-gradient(180deg, #F86E57, #f2e782)'
      // paddingTop: '30px',
      // height: '100px',
    },
    bottom: {
      paddingTop: '20px',
      // display: 'flex',
    },
  },
  hover: {
    fullName: {
      textDecoration: 'underline',
    },
  },
  content: {
    padding: '20px',
    marginTop: '-160px',
    color: '#fff',
    isolation: 'isolate',
  },
  seperator: {
    paddingTop: '10px',
  },
};
