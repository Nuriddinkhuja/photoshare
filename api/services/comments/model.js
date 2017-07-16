'use strict';

// user-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');


// declaring database table called 'comments'
module.exports = function(sequelize) {
  const comments = sequelize.define('comments', {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    post_id: {
			type: Sequelize.INTEGER,
      allowNull: true
		},
		comment: {
			type: Sequelize.STRING,
      allowNull: true
		}
  }, {
    freezeTableName: true
  });

  comments.sync();

  return comments;
};