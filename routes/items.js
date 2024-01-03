const express = require("express")
const { category, categoryList, Item, ItemList, pagination } = require("../controllers/items")
const router = express.Router()


router.route("/category").post(category).get(categoryList)
router.route("/item").post(Item).get(ItemList)
router.route("/pagination").get(pagination)
module.exports = router