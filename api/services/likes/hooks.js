import hooks from 'feathers-hooks-common';
import auth from 'feathers-authentication';
import populate from 'feathers-populate-hook';
import { required } from 'utils/validation';
import { validateHook as validate } from 'hooks';


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
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

export default messagesHooks;