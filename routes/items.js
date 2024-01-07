const express = require("express")
const {Item, ItemList, stocks, categoryList } = require("../controllers/items")
const { category, editCategory, deleteCategory, getCatDetail, categories } = require("../controllers/category")
const router = express.Router()


router.route("/category").post(category).get(categoryList)
router.route("/items").post(Item).get(ItemList)
// router.route("/pagination").get(pagination)
router.route("/stocks").get(stocks)

router.get('/get_category',categories)
router.post('/edit_category', editCategory)
router.get('/category_detail/:id', getCatDetail)
router.post('/delete_category', deleteCategory)

module.exports = router