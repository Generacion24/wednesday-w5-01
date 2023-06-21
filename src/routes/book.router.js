const { getAll, create, getOne, remove, update } = require('../controllers/book.controllers');
const express = require('express');

const routerBook = express.Router();

routerBook.route('/')
    .get(getAll)
    .post(create);

routerBook.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerBook;