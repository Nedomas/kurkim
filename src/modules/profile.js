import { createClient } from 'contentful';

export const LOAD_START = 'profile/LOAD_START';
export const LOAD_SUCCESS = 'profile/LOAD_SUCCESS';
export const LOAD_FAIL = 'profile/LOAD_FAIL';

const initialState = {
  loaded: false,
  loading: true,
  data: {},
};

export function load(personId) {
  return (dispatch) => {
    dispatch({ type: LOAD_START });

    const client = createClient({
      space: 'gd1luemmtdhg',
      accessToken: '061f951fbdcd7f83f6a232ee62538db3775213f6b3fd22b9f855fad8f0fac2ef',
    });

    return client.getEntry(personId)
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
      };

    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
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
