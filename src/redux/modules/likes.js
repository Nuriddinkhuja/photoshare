import { createApp } from 'app';

const restApp = createApp('rest');

const LOAD = 'redux-example/likes/LOAD';
const LOAD_SUCCESS = 'redux-example/likes/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/likes/LOAD_FAIL';
const ADD_ITEM = 'redux-example/likes/ADD_ITEM';
const ADDING_ITEM = 'redux-example/likes/ADDING_ITEM';
const ADDING_FAILURE = 'redux-example/likes/ADDING_FAILURE';
const REMOVE_ITEM = 'redux-example/likes/REMOVE_ITEM';
const REMOVING_ITEM = 'redux-example/likes/REMOVING_ITEM';
const REMOVING_FAILURE = 'redux-example/likes/REMOVING_FAILURE';

const appService = restApp.service('likes');

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
		case REMOVE_ITEM:
			return {
				...state,
				items: state.items.filter(item => item.id !== action.result.id)
			};
		case REMOVING_ITEM:
			return {
				...state
			};
		case REMOVING_FAILURE:
			return {
				...state,
				error: action.err
			};
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.likes && globalState.likes.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () => appService.find()
                    .then(page => ({ ...page, data: page.data }))
  };
}

export function addLikes(item) {
  console.log(item);
  return {
    types: [ADDING_ITEM, ADD_ITEM, ADDING_FAILURE],
    promise: () => appService
      .create({ ...item })
      .then(newItem => ({ item: newItem }))
      .catch((err) => ({ err: err.message }))
  };
}

export function removeLike(id) {
  return {
    types: [REMOVING_ITEM, REMOVE_ITEM, REMOVING_FAILURE],
    promise: () => appService
      .remove(id)
      .then(() => ({ id }))
      .catch((err) => ({ err: err.message }))
  };
}

