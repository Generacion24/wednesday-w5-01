const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Author = sequelize.define('author', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Author;