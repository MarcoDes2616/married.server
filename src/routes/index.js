const express = require('express');
const guestRouter = require('./guest.router');
const roleRouter = require('./role.router');
const titleRouter = require('./title.router');
const noteRouter = require('./note.router');
const requirementRouter = require('./requirement.router');
const supplierRouter = require('./suplier.router');
const router = express.Router();

// colocar las rutas aquí
router.use("/guest", guestRouter)

router.use("/roles", roleRouter)

router.use("/title", titleRouter)

router.use("/supplier", supplierRouter)

router.use("/requirement", requirementRouter)

router.use("/note", noteRouter)


module.exports = router;