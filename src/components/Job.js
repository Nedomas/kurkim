import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import Radium from 'radium';
import windowSize from 'react-window-size';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';

import step from '@bloometry/step';
import colors from '../theme/colors';

import Navbar from './Navbar';
import Container from './Container';
import Headline from './Headline';
import Text from './Text';
import Button from './Button';

import MarkdownRendererImage from './MarkdownRenderers/Image';
import MarkdownRendererLink from './MarkdownRenderers/Link';
import MarkdownRendererList from './MarkdownRenderers/List';
import MarkdownRendererListItem from './MarkdownRenderers/ListItem';
import MarkdownRendererParagraph from './MarkdownRenderers/Paragraph';

import maxReadableWidth from '../theme/maxReadableWidth';

const RENDERERS = {
  image: MarkdownRendererImage,
  link: MarkdownRendererLink,
  list: MarkdownRendererList,
  listItem: MarkdownRendererListItem,
  paragraph: MarkdownRendererParagraph,
};

class Job extends Component {
  render() {
    const {
      data: {
        loading,
      },
    } = this.props;

    if (loading) return <div/>;

    const {
      data: {
        Job: {
          headline,
          teaser,
          description,
          applyLink,
          company: {
            name,
            logo: {
              url: companyLogoUrl,
            },
          },
        },
      },
    } = this.props;

    const small = this.props.windowWidth <= 768;

    return (
      <div>
        <Navbar dark />

        <Container style={styles.container}>
          <div style={styles.company.container}>
            <div style={styles.company.logo.container}>
              <div
                style={[
                  {
                    backgroundImage: `url('${companyLogoUrl}')`
                  },
                  styles.company.logo.img,
                ]}
              />
            </div>
            <Headline tier={3}>
              {name}
            </Headline>
            <Text tier={3}>
              Motyvacinį laišką ir gyvenimo aprašymą (CV) prašome siųsti info@atostoguparkas.lt Informuosime tik atrinktus kandidatus.
            </Text>
            <Button component='a' href={applyLink} target='_blank' center>
              Aplikuoti
            </Button>
          </div>

          <div style={styles.content.container}>
            <Headline tier={2}>
              {headline}
            </Headline>
            <Text>
              <ReactMarkdown
                source={description}
                escapeHtml={false}
                renderers={RENDERERS}
              />
            </Text>
          </div>
        </Container>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
  },
  company: {
    container: {
      width: '30%',
      textAlign: 'center',
      paddingRight: step(3),
    },
    logo: {
      img: {
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '9999999999px',
        border: `1px solid ${colors.black}`,
        width: '200px',
        height: '200px',
        backgroundColor: colors.white,
        margin: '0 auto',
      },
      container: {
        backgroundImage: 'url("/chaos-black.svg")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        paddingBottom: step(2),
        marginBottom: step(1.5),
      },
    },
  },
  content: {
    container: {
      width: '70%',
      maxWidth: maxReadableWidth,
    },
  },
};

const JobQuery = gql`
  query JobQuery($id: ID!) {
    Job(id: $id) {
      id
      headline
      teaser
      description
      activeFrom
      activeUntil
      applyLink

      cities {
        name
      }

      company {
        name
        logo {
          url
        }
      }
    }
  }
`;

export default compose(
  graphql(JobQuery, {
    options: ({
      match: {
        params: {
          id,
        },
      },
    }) => ({
      variables: {
        id,
      },
    }),
  }),
  windowSize,
  Radium,
)(Job);
