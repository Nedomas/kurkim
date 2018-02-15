import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';

import Navbar from './Navbar';

import {
  load,
  submit,
} from '../modules/applyPerson';

class ApplyPerson extends Component {
  componentDidMount() {
    this.props.handleLoad();
  }

  render() {
    const {
      applyPerson: {
        loading,
        all,
      },
      handleSubmit,
      onSubmit,
    } = this.props;

    if (loading) return '';

    return (
      <div>
        <Navbar dark />

        <form style={styles.container} onSubmit={handleSubmit((values) => onSubmit(values))}>
          {_.map(all, (question) => (
            <div key={question.sys.id}>
              <label htmlFor={question.sys.id}>
                {question.fields.text}
              </label>
              <Field name={question.sys.id} component='input' type='text' />
            </div>
          ))}
          <button type='submit'>
            Tęsti
          </button>
        </form>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 auto',
    padding: '40px 120px',
  },
  blocks: {
    top: {
      display: 'flex',
    },
  },
  mainPhoto: {
    container: {
      width: '30%',
      maxWidth: '500px',
      marginRight: '50px',
    },
    img: {
      width: '100%',
    },
  },
  content: {
    container: {
      width: '70%',
    },
  },
  fullName: {
    fontSize: '60px',
    margin: '-15px 0 0 -6px',
  },
  title: {
    fontSize: '30px',
    marginLeft: '-3px',
  },
  city: {
    fontFamily: '"CT Cinetype"',
    paddingTop: '10px',
  },
}

const ConnectedApplyPerson = connect(state => ({
  applyPerson: state.applyPerson,
}), {
  handleLoad: load,
  onSubmit: submit,
})(ApplyPerson);

export default reduxForm({
  form: 'applyPerson'
})(ConnectedApplyPerson);
