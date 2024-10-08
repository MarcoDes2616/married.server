const catchError = require('../utils/catchError');
const Guests = require('../models/Guests');
const Title = require('../models/Title');
const Role = require('../models/Role'); // Asegúrate de importar el modelo Role
const jwt = require("jsonwebtoken");
const sendEmail = require('../utils/sendMail');

const getAll = catchError(async (req, res) => {
    const { roleId } = req.query; // Obtener el roleId de la query

    const results = await Guests.findAll({
        attributes: {
            exclude: ["titleId", "roleId"]
        },
        where: roleId ? { roleId } : {}, // Filtrar si roleId está presente
        include: [
            {
                model: Title,
                attributes: ["title"]
            },
            {
                model: Role,
                attributes: ["role_name"]
            }
        ]
    });

    return res.json(results);
});


const create = catchError(async (req, res) => {
    const result = await Guests.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Guests.findByPk(id, {
        attributes: {
            exclude: ["titleId"]
        },
        include: [
            {
                model: Title,
                attributes: ["title"]
            },
            {
                model: Role, // Incluir el modelo Role
                attributes: ["role_name"] // Incluir el atributo role_name
            }
        ]
    });
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Guests.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Guests.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const sendInvitation = catchError(async (req, res) => {
    const { id } = req.params;
    const { frontBaseUrl } = req.body;
    const {email} = await Guests.findByPk(id);
    
    // Generar token para el invitado
    const guest_token = jwt.sign({ email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
    });

    // Actualizar el guest_token y la fecha de envío
    await Guests.update(
        { 
            guest_token, 
            invitation_sent_at: new Date() // Guardar la fecha de envío
        }, 
        { where: { id } }
    );

    // Enviar el correo
    await sendEmail({
        to: guest.email,
        subject: "INVITACIÓN DE MATRIMONIO M&K",
        html: `<h3>Si no vienes, envía el regalo</h3>
                <a href="${frontBaseUrl}/${guest_token}">Obtener invitación</a><br />
                <a href="https://calendar.app.google/rf2TTVUCp2AgbJar8">Click para Agendar</a>
                `
    });

    return res.json({ success: true });
});

const getGuestByToken = catchError(async (req, res) => {
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
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    getGuestByToken,
    sendInvitation
};


//CREATE READ UPDATE DELETE