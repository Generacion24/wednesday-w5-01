const { getAll, create, getOne, remove, update, setAuthors } = require('../controllers/book.controllers');
const express = require('express');

const routerBook = express.Router();

routerBook.route('/')
    .get(getAll)
    .post(create);


  // /books/:id/authors 
routerBook.route('/:id/authors')
    .post(setAuthors)

routerBook.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerBook;