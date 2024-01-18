'use strict';

const { COMMANDS_TABLE } = require('../models/commands.model');
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(COMMANDS_TABLE, 'instructions', {
      allowNull: true,
      type: DataTypes.STRING
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(COMMANDS_TABLE, 'instructions');
  }
};
