'use strict';

const { USER_TABLE } = require('../models/user.model');
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(USER_TABLE, 'is_auth', {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(USER_TABLE, 'is_auth');
  }
};
