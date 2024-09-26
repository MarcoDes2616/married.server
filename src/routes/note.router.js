const { getAll, create, getOne, remove, update } = require('../controllers/note.controller');
const express = require('express');

const noteRouter = express.Router();

noteRouter.route('')
    .get(getAll)
    .post(create);

noteRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = noteRouter;