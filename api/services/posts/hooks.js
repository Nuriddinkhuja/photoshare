import hooks from 'feathers-hooks-common';
import auth from 'feathers-authentication';
import populate from 'feathers-populate-hook';
import { required } from 'utils/validation';
import { validateHook as validate } from 'hooks';

// const schemaValidator = {
//   text: required
// };

function populateUser() {
  return populate({
    users: {
      service: 'users',
      f_key: 'id',
      l_key: 'user_id'
    },
    likes: {
      service: 'likes',
      f_key: 'post_id',
      l_key: 'id'
    }
  });
}

const messagesHooks = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
    ],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [
      populateUser()
    ],
    get: [
      populateUser()
    ],
    create: [
      populateUser()
    ],
    update: [
      populateUser()
    ],
    patch: [
      populateUser()
    ],
    remove: []
  }
};

export default messagesHooks;
