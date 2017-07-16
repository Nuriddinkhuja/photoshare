import users from './users';
import posts from './posts';
import comments from './comments';
import blob from './blob';
import likes from './likes';
const Sequelize = require('sequelize');

export default function services() {
  const app = this;
  const sequelize = new Sequelize('postgres://postgres:sahovat@localhost:5432/socialnetwork', {
    dialect: 'postgres',
    logging: false
  });


  app.set('sequelize', sequelize);
  app.configure(users);
  app.configure(posts);
  app.configure(comments);
  app.configure(likes);
  app.configure(blob);
}
