const express = require('express');
const guestRouter = require('./guest.router');
const roleRoutes = require('./role.router');
const router = express.Router();

// colocar las rutas aquí
router.use("/guest", guestRouter)

router.use("/roles", roleRoutes)


module.exports = router;