import { createClient } from 'contentful';
import _ from 'lodash';

export const LOAD_START = 'entries/LOAD_START';
export const LOAD_SUCCESS = 'entries/LOAD_SUCCESS';
export const LOAD_FAIL = 'entries/LOAD_FAIL';

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

    return client.getEntries()
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
      const filteredItems = _.filter(action.result.items, (item) => {
        return _.includes(['job', 'event', 'person'], item.sys.contentType.sys.id);
      });

      return {
        ...state,
        loading: false,
        all: filteredItems,
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
