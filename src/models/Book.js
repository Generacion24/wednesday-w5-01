const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Book = sequelize.define('book', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Book;