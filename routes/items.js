const express = require("express")
const { category, categoryList, Item, ItemList, stocks, updateItems, getitemById, getCategoryByName, uploadImg, deleteItem, deleteManyItems } = require("../controllers/items")
const router = express.Router()


router.route("/category").post(category).get(categoryList)
router.route("/items").post(Item).get(ItemList)
router.route("/uploadImg").post(uploadImg)
router.route("/updateItem/:id").post(updateItems)
router.route("/getItemById/:id").get(getitemById)
router.route("/getCategoryByName/:name").get(getCategoryByName)
router.route("/stocks").get(stocks)
router.route("/deleteItem/:id").get(deleteItem)
router.route("/delete/:id").get(deleteManyItems)
module.exports = router