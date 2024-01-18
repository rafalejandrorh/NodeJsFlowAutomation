const { User, UserSchema } = require('./user.model');
const { Commands, CommandsSchema } = require('./commands.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Commands.init(CommandsSchema, Commands.config(sequelize));

  User.associate(sequelize.models);
  Commands.associate(sequelize.models);
}

module.exports = setupModels;
