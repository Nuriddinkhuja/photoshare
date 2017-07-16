const service = require('../sequelize/index');
const model = require('./model');
import NeDB from 'nedb';
import hooks from './hooks';

export default function messagesService() {
  const app = this;

  const options = {
    Model: model(app.get('sequelize')),
    paginate: {
      default: 25,
      max: 100
    },
    sequelize: app.get('sequelize'),
    include: [
      { model: 'users', foreignKey: 'id', alias: 'users' },
      { model: 'likes', foreignKey: 'id', alias: 'likes' }
    ]
  };

  app.use('/posts', service(options));

  app.service('posts').hooks(hooks);
}
