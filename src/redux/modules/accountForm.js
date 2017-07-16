const LOAD = 'redux-example/accountForm/LOAD';

const initialState = {
  data: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
}

export const load = data => ({ type: LOAD, data });
