const catchError = require('../utils/catchError');
const Book = require('../models/Book');
const Author = require('../models/Author')

const getAll = catchError(async(req, res) => {
    const results = await Book.findAll({include:[Author]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Book.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Book.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Book.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Book.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setAuthors = catchError(async(req,res)=>{ // /books/:id/authors
    
    //paso 1 ->. obtern id y encontrrar al libro con ese id
    const {id} = req.params
    const book = await Book.findByPk(id)

    //paso 2 ->. setear el autor en formato array
    await book.setAuthors(req.body)

    //paso 3 ->. Leo los autores del libro
    const authors = await book.getAuthors()

    return res.json(authors)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setAuthors
}