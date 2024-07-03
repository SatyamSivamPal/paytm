const express = require('express');
const userRoute = require('./user')
const accountRoute = require("./account")
const meRoute = require("./me")

const router = express.Router();

router.use("/me", meRoute)
router.use("/user", userRoute)
router.use("/account", accountRoute)

module.exports = router
