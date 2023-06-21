const { getAll, create, getOne, remove, update } = require('../controllers/author.controllers');
const express = require('express');

const routerAuthor = express.Router();

routerAuthor.route('/')
    .get(getAll)
    .post(create);

routerAuthor.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerAuthor;