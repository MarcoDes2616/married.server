const { getAll, create, getOne, remove, update, getAllOrderedByPrice } = require('../controllers/requirement.controller');
const express = require('express');

const requirementRouter = express.Router();

requirementRouter.route('')
    .get(getAll) 
    .post(create);

requirementRouter.route('/ordered-by-price')
    .get(getAllOrderedByPrice);

requirementRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = requirementRouter;
