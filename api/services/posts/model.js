'use strict';

// user-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');


// declaring database table called 'posts'
module.exports = function(sequelize) {
  const posts = sequelize.define('posts', {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
		img_path: {
      type: Sequelize.STRING,
      allowNull: true
    },
    createdAt: {
    	type: Sequelize.DATE,
    	defaultValue: Sequelize.NOW,
    	validate: {
    		isDate: true
    	}
    },
    likes: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    views: {
			type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
		}
  }, {
    freezeTableName: true
  });

  posts.sync();

  return posts;
};