const { getAll, create, getOne, remove, update } = require('../controllers/role.controller');
const express = require('express');

const roleRouter = express.Router();

roleRouter.route('/')
    .get(getAll)
    .post(create);

roleRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = roleRouter;