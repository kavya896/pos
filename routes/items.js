const express = require("express")
const { category, categoryList, Item, ItemList, stocks, updateItems, getitemById, getCategoryByName, uploadImg, deleteItem, deleteManyItems,categoryItems } = require("../controllers/items")
const {  editCategory, deleteCategory, getCatDetail, categories, categoryDelete } = require("../controllers/category")
const { addToCart, updateCart, changeQuantity, cancelCartItem, selectOrderType, getcart } = require("../controllers/cartController")
const { order, getOrders } = require("../controllers/orderController");
const router = express.Router()
const { createCustomer, getCustomer, getCustomerList, editCustomer, deleteCustomer } = require("../controllers/customer");
const { createTable, createBooking, getDetailsOfBooking } = require("../controllers/bookings");
const { transactionDetails, grossSales, grossprofit, netSales, discount, refunds, salesByItems } = require("../controllers/transaction");


router.route("/category").post(category).get(categoryList)
router.route("/items").post(Item).get(ItemList)
router.route("/uploadImg").post(uploadImg)
router.route("/updateItem/:id").post(updateItems)
router.route("/getItemById/:id").get(getitemById)
router.route("/getCategoryByName/:name").get(getCategoryByName)
router.route("/stocks").get(stocks)
router.route("/deleteItem/:id").get(deleteItem)
router.route("/delete/:id").get(deleteManyItems)


//cartController

router.post('/select_ordertype', selectOrderType)
router.get('/getcart', getcart)
router.post('/add_tocart', addToCart)
router.post('/update_cart', updateCart)
router.patch('/change_quantity', changeQuantity)
router.patch('/cancel_item', cancelCartItem)


//category

router.get('/get_categoryitem', categoryItems)
router.get('/get_category',categories)
router.post('/edit_category', editCategory)
router.get('/category_detail/:id', getCatDetail)
router.post('/delete_category', deleteCategory)
router.post('/category_delete', categoryDelete)
//order
router.post('/place_order', order)
router.get('/get_order', getOrders)

//customers
router.post('/create_customer', createCustomer)
router.post('/get_customer', getCustomer)
router.get('/get_customerlist', getCustomerList)
router.patch('/edit_customer', editCustomer)
router.post('/delete_customer', deleteCustomer)

//bookings
router.route("/table").post(createTable)
router.route("/booking").post(createBooking).get(getDetailsOfBooking)

//transaction
router.route("/transaction").get(transactionDetails)

//sales summary
router.route("/grossSales").get(grossSales)
router.route("/refunds").get(refunds)
router.route("/discount").get(discount)
router.route("/netSales").get(netSales)
router.route("/grossprofit").get(grossprofit)

//sales By Items
router.route("/salesByItems").get(salesByItems)
module.exports = router