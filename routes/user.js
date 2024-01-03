const express = require("express")
const router = express.Router()
const {login, category, register, categoryList } = require("../controllers/user")

router.route("/").post(login)
router.route("/register").post(register)

module.exports = router