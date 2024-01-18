const express = require("express")
const multer = require('multer');
const csv = require('csv-parser');

const {Item, ItemList, stocks, categoryList, uploadImg, updateItems, getitemById, deleteItem, uploardCsv, addOnItemList, categoryItems } = require("../controllers/items")
const { category, editCategory, deleteCategory, getCatDetail, categories, categoryDelete } = require("../controllers/category")
const { addToCart, updateCart, changeQuantity, cancelCartItem, selectOrderType, getcart } = require("../controllers/cartController")
const { createCustomer, getCustomer, getCustomerList, editCustomer, deleteCustomer } = require("../controllers/customer");
const { order, getOrders } = require("../controllers/orderController");

const router = express.Router()
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.route("/category").post(category).get(categoryList)
router.route("/items").post(Item).get(ItemList)
router.route("/stocks").get(stocks)
router.route("/uploadImg").post(uploadImg)
router.route("/updateItem/:id").post(updateItems)
router.route("/getItemById/:id").get(getitemById)
router.route("/deleteItem/:id").get(deleteItem)

// router.post('/itemcsv_upload',upload.single('file'), uploardCsv)
router.get('/addonitem', addOnItemList)

router.get('/get_categoryitem', categoryItems)
router.get('/get_category',categories)
router.post('/edit_category', editCategory)
router.get('/category_detail/:id', getCatDetail)
router.post('/delete_category', deleteCategory)
router.post('/category_delete', categoryDelete)

router.post('/select_ordertype', selectOrderType)
router.get('/getcart', getcart)
router.post('/add_tocart', addToCart)
router.post('/update_cart', updateCart)
router.patch('/change_quantity', changeQuantity)
router.patch('/cancel_item', cancelCartItem)

router.post('/create_customer', createCustomer)
router.post('/get_customer', getCustomer)
router.get('/get_customerlist', getCustomerList)
router.patch('/edit_customer', editCustomer)
router.post('/delete_customer', deleteCustomer)

router.post('/place_order', order)
router.get('/get_order', getOrders)


module.exports = router