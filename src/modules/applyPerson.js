import { createClient } from 'contentful';
import _ from 'lodash';

export const LOAD_START = 'applyPerson/LOAD_START';
export const LOAD_SUCCESS = 'applyPerson/LOAD_SUCCESS';
export const LOAD_FAIL = 'applyPerson/LOAD_FAIL';

export const SUBMIT_START = 'applyPerson/SUBMIT_START';
export const SUBMIT_SUCCESS = 'applyPerson/SUBMIT_SUCCESS';
export const SUBMIT_FAIL = 'applyPerson/SUBMIT_FAIL';

const initialState = {
  all: [],
  includes: [],
};

export function load() {
  return (dispatch) => {
    dispatch({ type: LOAD_START });

    const client = createClient({
      space: 'gd1luemmtdhg',
      accessToken: '061f951fbdcd7f83f6a232ee62538db3775213f6b3fd22b9f855fad8f0fac2ef',
    });

    return client.getEntries({ 'sys.contentType.sys.id': 'questionsForCreative' })
      .then((result) => dispatch({ type: LOAD_SUCCESS, result }))
      .catch((error) => dispatch({ type: LOAD_FAIL, error }));
  }
}

export function submit() {
  return (dispatch) => {
    dispatch({ type: SUBMIT_START });

    const client = createClient({
      space: 'gd1luemmtdhg',
      accessToken: '061f951fbdcd7f83f6a232ee62538db3775213f6b3fd22b9f855fad8f0fac2ef',
    });

    return client.getEntries({ 'sys.contentType.sys.id': 'questionsForCreative' })
      .then((result) => dispatch({ type: LOAD_SUCCESS, result }))
      .catch((error) => dispatch({ type: LOAD_FAIL, error }));
  }
}

export default function initialData(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_START:
      return {
        ...state,
        loading: true,
        initialized: true,
      };

    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        all: action.result.items,
        includes: action.result.includes,
      };

    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
