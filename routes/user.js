const express = require("express")
const router = express.Router()
const {Login} = require("../controllers/user")

router.route("/").post(Login)

module.exports = router