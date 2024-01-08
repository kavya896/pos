const express = require("express")
const { category, categoryList, Item, ItemList, stocks, updateItems, getitemById, getCategoryByName, uploadImg } = require("../controllers/items")
const router = express.Router()


router.route("/category").post(category).get(categoryList)
router.route("/items").post(Item).get(ItemList)
router.route("/uploadImg").post(uploadImg)
router.route("/updateItem/:id").post(updateItems)
router.route("/getItemById/:id").get(getitemById)
router.route("/getCategoryByName/:name").get(getCategoryByName)
router.route("/stocks").get(stocks)
module.exports = router