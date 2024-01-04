const express = require("express")
const { category, categoryList, Item, ItemList } = require("../controllers/items")
const router = express.Router()


router.route("/category").post(category).get(categoryList)
router.route("/items").post(Item).get(ItemList)
// router.route("/pagination").get(pagination)
module.exports = router