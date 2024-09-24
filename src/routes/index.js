const express = require('express');
const guestRouter = require('./guest.router');
const router = express.Router();

// colocar las rutas aquí
router.use("/guest", guestRouter)

module.exports = router;