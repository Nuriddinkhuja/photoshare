'use strict';

const Sequelize = require('sequelize');


// declaring database table called 'likes'
module.exports = function(sequelize) {
  const likes = sequelize.define('likes', {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    post_id: {
			type: Sequelize.INTEGER,
      allowNull: true
		}
  }, {
    freezeTableName: true
  });

  likes.sync();

  return likes;
};