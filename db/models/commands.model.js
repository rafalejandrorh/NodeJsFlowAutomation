const { Model, DataTypes, Sequelize } = require('sequelize');

const COMMANDS_TABLE = 'commands';

const CommandsSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    description: {
        allowNull: true,
        type: DataTypes.STRING
    },
    status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        unique: false,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW
    },
    instructions: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'instructions'
    },
    hasAuth: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}

class Commands extends Model {
    
    static associate(models) {
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: COMMANDS_TABLE,
            modelName: 'Commands',
            timestamps: false
        }
    }
}

module.exports = { COMMANDS_TABLE, CommandsSchema, Commands }
