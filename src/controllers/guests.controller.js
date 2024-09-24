const catchError = require('../utils/catchError');
const Guests = require('../models/Guests');
const Title = require('../models/Title');
const jwt = require("jsonwebtoken");
const sendEmail = require('../utils/sendMail');

const getAll = catchError(async(req, res) => {
    const results = await Guests.findAll({
        attributes: {
            exclude: ["titleId"]
        },
        include: {
            model: Title,
            attributes: ["title"]
        }
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Guests.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Guests.findByPk(id, {
        attributes: {
            exclude: ["titleId"]
        },
        include: {
            model: Title,
            attributes: ["title"]
        }
    });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Guests.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Guests.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const sendInvitation = catchError(async(req, res) => {
    const { id } = req.params;
    const { frontBaseUrl } = req.body;
    const guest = await Guests.findByPk(id);
    const guest_token = jwt.sign({ guest }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
      });
    await Guests.update({guest_token}, {where: {id}})
    await sendEmail({
        to: guest.email,
        subject: "INVITACIÓN DE MATRIMONIO M&K",
        html: ` <h3>Si no vienes, envía el regalo</h3>
                <a href="${frontBaseUrl}/${guest_token}">Obtener invitación</a><br />
                <a href="https://calendar.app.google/rf2TTVUCp2AgbJar8">Click para Agendar</a>
                `
      });
    return res.json({success: true});
})

const getGuestByToken = catchError(async(req, res) => {
    const { token } = req.params;
    console.log(token);
    
    const result = await Guests.findOne({
        where: { guest_token: token },
        attributes: ["first_name", "last_name"],
        include: {
            model: Title,
            attributes: ["title"]
        }
    });    
    if(!result) return res.sendStatus(404);
    return res.json(result);
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    getGuestByToken,
    sendInvitation
}

//CREATE READ UPDATE DELETE