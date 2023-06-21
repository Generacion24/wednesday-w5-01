const express = require('express');
const routerBook = require('./book.router');
const routerAuthor = require('./author.router');
const routerStudent = require('./student.router');
const routerCourse = require('./course.router');
const router = express.Router();

// colocar las rutas aquí

router.use('/books', routerBook)
router.use('/authors', routerAuthor)
router.use('/students', routerStudent)
router.use('/courses', routerCourse)

module.exports = router;