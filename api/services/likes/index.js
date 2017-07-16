const service = require('../sequelize/index');
const model = require('./model');
import hooks from './hooks';

export default function messagesService() {
  const app = this;

  const options = {
    Model: model(app.get('sequelize')),
    paginate: {
      default: 25,
      max: 100
    },
    sequelize: app.get('sequelize')
  };

  app.use('/likes', service(options));

  app.service('likes').hooks(hooks);
}
