import { createApp } from 'app';

const restApp = createApp('rest');

const LOAD = 'redux-example/comments/LOAD';
const LOAD_SUCCESS = 'redux-example/comments/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/comments/LOAD_FAIL';
const ADD_ITEM = 'redux-example/comments/ADD_ITEM';
const ADDING_ITEM = 'redux-example/comments/ADDING_ITEM';
const ADDING_FAILURE = 'redux-example/comments/ADDING_FAILURE';

const appService = restApp.service('comments');

const initialState = {
  loaded: false,
  items: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.result.data
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case ADD_ITEM:
      return {
        ...state,
        items: state.items.concat(action.result.item)
      };
    case ADDING_ITEM:
      return {
        ...state
      };
    case ADDING_FAILURE:
      return {
        ...state,
        error: action.err
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.comments && globalState.comments.loaded;
}

export function load(query) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () => appService.find({ query })
                    .then(page => ({ ...page, data: page.data }))
  };
}


export function addComment(item) {
  console.log(item);
  return {
    types: [ADDING_ITEM, ADD_ITEM, ADDING_FAILURE],
    promise: () => appService
      .create({ ...item })
      .then(newItem => ({ item: newItem }))
      .catch((err) => ({ err: err.message }))
  };
}

