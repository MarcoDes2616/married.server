const catchError = require('../utils/catchError');
const Supplier = require('../models/Supplier');
const Requirement = require('../models/Requirement');
const Comment = require('../models/Comment');

const getAll = catchError(async(req, res) => {
    const results = await Supplier.findAll({
        include: [
            {
                model: Comment,
                attributes: ["comment"]
            },
            {
                model: Requirement,
                attributes: ["requirement"]
            }
        ]
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {requirementId, full_name, phone, price} = req.body
    const {id: supplierId} = await Supplier.create({full_name, phone});
    await Requirement.update({supplierId, price},
        { where: {id : requirementId}, returning: true }
    )
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Supplier.findByPk(id, {
        include: [
            {
                model: Comment,
                attributes: ["comment"]
            },
            {
                model: Requirement,
                attributes: ["requirement"]
            }
        ]
    });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
        return res.status(404).json({ message: "Supplier not found" });
    }
    await Requirement.update(
        { supplierId: null, price: null },
        { where: { supplierId: id } }
    );
    await Supplier.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Supplier.update(
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
    update
}