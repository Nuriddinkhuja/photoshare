'use-strict'

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
	const user = sequelize.define('users', {
		email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    firstName: {
    	type: Sequelize.STRING,
    	allowNull: true
    },
    lastName: {
    	type: Sequelize.STRING,
    	allowNull: true
    },
		password: {
      type: Sequelize.STRING,
      allowNull: false
    },
			avatar_path: {
      type: Sequelize.STRING,
      allowNull: true
    },
	}, {
		freezeTableName: true
	});

	user.sync();

	return user;
};