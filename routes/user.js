const express = require("express")
const router = express.Router()
const {login, category, register, categoryList } = require("../controllers/user")

router.route("/").post(login)
router.route("/register").post(register)
router.route("/category").post(category).get(categoryList)
// router.route("/dishes").post(dishes)
// router.route("/addIngredient").post(ingredient)
// router.route("/listunit").get(listIngredientCategory)
// router.route("/itemType/:typeOfDishItem").get(itemsByType)
module.exports = router