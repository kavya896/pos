const express = require("express")
const router = express.Router()
const {login, dishes, itemsByType, register} = require("../controllers/user")

router.route("/").post(login)
router.route("/register").post(register)
router.route("/dishes").post(dishes)
router.route("/itemType/:typeOfDishItem").get(itemsByType)
module.exports = router