const { getAll, create, getOne, remove, update } = require('../controllers/supplier.controller');
const express = require('express');

const supplierRouter = express.Router();

supplierRouter.route('')
    .get(getAll)
    .post(create);

supplierRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = supplierRouter;