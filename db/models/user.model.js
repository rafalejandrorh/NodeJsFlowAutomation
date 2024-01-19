const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        default: Sequelize.fn('uuid_generate_v4')
    },
    username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'client'
    },
    recoveryToken: {
        field: 'recovery_token',
        allowNull: true,
        type: DataTypes.STRING
    },
    telegramId: {
        field: 'telegram_id',
        allowNull: true,
        type: DataTypes.INTEGER
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
    isAuth: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        field: 'is_auth',
        defaultValue: false
    }
}

class User extends Model {
    
    static associate(models) {
        /*
        this.hasOne(models.Customer, {
            as: 'customer',
            foreignKey: 'userId'
        });
        */
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User }
