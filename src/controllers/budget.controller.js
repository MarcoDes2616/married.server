const catchError = require('../utils/catchError');
const Budget = require('../models/Budget');

const getBudget = catchError(async (req, res) => {
    const totalBudget = await Budget.sum('amount');
    return res.json({
        totalBudget,
    });
});

const create = catchError(async(req, res) => {
    const result = await Budget.create(req.body);
    return res.status(201).json(result);
});


module.exports = {
    getBudget,
    create,
}