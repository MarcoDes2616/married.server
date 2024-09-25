const express = require('express');
const guestRouter = require('./guest.router');
const roleRouter = require('./role.router');
const titleRouter = require('./title.router');
const router = express.Router();

// colocar las rutas aquí
router.use("/guest", guestRouter)

router.use("/roles", roleRouter)

router.use("/title", titleRouter)


module.exports = router;