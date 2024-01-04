const express = require("express")
const { category, categoryList, Item, ItemList, stocks } = require("../controllers/items")
const router = express.Router()


router.route("/category").post(category).get(categoryList)
router.route("/items").post(Item).get(ItemList)
// router.route("/pagination").get(pagination)
router.route("/stocks").get(stocks)
module.exports = router