'use strict';

const { COMMANDS_TABLE, CommandsSchema } = require('./../models/commands.model');

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable(COMMANDS_TABLE, CommandsSchema);
    },
  
    down: async (queryInterface) => {
        await queryInterface.dropTable(COMMANDS_TABLE);
    }
};
