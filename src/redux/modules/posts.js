import { createApp } from 'app';

const restApp = createApp('rest');

const LOAD = 'redux-example/posts/LOAD';
const LOAD_SUCCESS = 'redux-example/posts/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/posts/LOAD_FAIL';
const ADD_ITEM = 'redux-example/posts/ADD_ITEM';
const ADDING_ITEM = 'redux-example/posts/ADDING_ITEM';
const ADDING_FAILURE = 'redux-example/posts/ADDING_FAILURE';
const UPDATE_ITEM = 'redux-example/posts/UPDATE_ITEM';
const UPDATING_ITEM = 'redux-example/posts/UPDATING_ITEM';
const UPDATING_FAILURE = 'redux-example/posts/UPDATING_FAILURE';
const CLEAR_ITEMS = 'redux-example/posts/CLEAR_ITEMS';
const VIEWS_INCREMENT = 'redux-example/posts/VIEWS_INCREMENT';
const VIEWS_INCREMENT_SUCCESS = 'redux-example/posts/VIEWS_INCREMENT_SUCCESS';
const VIEWS_INCREMENT_FAIL = 'redux-example/posts/VIEWS_INCREMENT_FAIL';

const appService = restApp.service('posts');

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
    case UPDATE_ITEM:
      const updatedItem = action.result;
      return {
        ...state,
        items: state.items.map(item => (item.id === updatedItem.id ?
            { ...item, ...updatedItem } :
            item)
        )
      };
    case UPDATING_ITEM:
      return {
        ...state
      };
    case UPDATING_FAILURE:
      return {
        ...state,
        error: action.err
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        loaded: false,
        items: []
      };
    case VIEWS_INCREMENT:
      return {
        ...state
      };
    case VIEWS_INCREMENT_SUCCESS:
      return {
        ...state,
        views: state.views + 1
      };
    case VIEWS_INCREMENT_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.posts && globalState.posts.loaded;
}

export function load(query) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () => appService.find({ query })
                    .then(page => ({ ...page, data: page.data }))
                    .catch((err) => ({ err: err.message }))
  };
}

export function addItem(item) {
  console.log(item);
  return {
    types: [ADDING_ITEM, ADD_ITEM, ADDING_FAILURE],
    promise: () => appService
      .create({ ...item })
      .then(newItem => ({ item: newItem }))
      .catch((err) => ({ err: err.message }))
  };
}

export function updateItem(id, item) {
  return {
    types: [UPDATING_ITEM, UPDATE_ITEM, UPDATING_FAILURE],
    promise: () => appService
      .patch(id, { ...item })
      .then(() => ({ ...item, id }))
      .catch((err) => ({ err: err.message }))
  };
}

export function clearItems() {
  return {
    type: CLEAR_ITEMS
  };
}

export function incrementView(item) {
  console.log(item);
  return {
    types: [VIEWS_INCREMENT, VIEWS_INCREMENT_SUCCESS, VIEWS_INCREMENT_FAIL],
    promise: () => restApp.service('posts').patch(item[0].id, { views: item[0].views + 1 })
  };
}

