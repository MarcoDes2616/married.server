const { getAll, create, getOne, remove, update, getGuestByToken, sendInvitation } = require('../controllers/guests.controller');
const express = require('express');

const guestRouter = express.Router();

guestRouter.route('/')
    .get(getAll)
    .post(create);

guestRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

guestRouter.route("/get_guest/:token")
    .get(getGuestByToken)

guestRouter.route("/send_invitation/:id")
    .post(sendInvitation)

module.exports = guestRouter;