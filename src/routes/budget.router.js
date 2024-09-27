const {  getBudget, create } = require('../controllers/budget.controller');
const express = require('express');

const budgetRouter = express.Router();

budgetRouter.route('')
    .get(getBudget)
    .post(create);


module.exports = budgetRouter;