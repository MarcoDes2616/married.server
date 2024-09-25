const { getAll, create, getOne, remove, update } = require('../controllers/title.controller');
const express = require('express');

const titleRouter = express.Router();

titleRouter.route('/')
    .get(getAll)
    .post(create);

titleRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = titleRouter;