const catchError = require('../utils/catchError');
const Requirement = require('../models/Requirement');

const getAll = catchError(async(req, res) => {
    const results = await Requirement.findAll({
        where: {
          supplierId: null,
        }
    });
    return res.json(results);
});

const getAllOrderedByPrice = catchError(async (req, res) => {
    const results = await Requirement.findAll({
      order: [
        ['price', 'ASC']
      ],
    });
    return res.json(results);
  });

const create = catchError(async(req, res) => {
    const result = await Requirement.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Requirement.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Requirement.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Requirement.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    getAllOrderedByPrice
}