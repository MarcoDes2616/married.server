const { getAll, create, getOne, remove, update } = require('../controllers/role.controller');
const express = require('express');

const roleRoutes = express.Router();

roleRoutes.route('/')
    .get(getAll)
    .post(create);

roleRoutes.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = roleRoutes;