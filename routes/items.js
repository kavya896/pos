const express = require("express")
const multer = require('multer');
const csv = require('csv-parser');

const {Item, ItemList, stocks, categoryList, uploadImg, updateItems, getitemById, deleteItem, uploardCsv, addOnItemList, categoryItems, ItemListPos, createModifiers, getModifierOptions, deleteModifiers, itemsList, deleteManyItems } = require("../controllers/items")
const { category, editCategory, deleteCategory, getCatDetail, categories, categoryDelete } = require("../controllers/category")
const { addToCart, updateCart, changeQuantity, cancelCartItem, selectOrderType, getcart, cancelCart } = require("../controllers/cartController")
const { createCustomer, getCustomer, getCustomerList, editCustomer, deleteCustomer, customerList, deleteCustomers } = require("../controllers/customer");
const { order, getOrders, editOrder, getEditOrder, getRunningOrders, billing, getPaidOrders } = require("../controllers/orderController");
const { createTable, createBooking, getDetailsOfBooking, getTableList } = require("../controllers/booking");
const { transactionDetails } = require("../controllers/transaction");
const { getEmployeeList, deleteEmployee, register, getEmployeeById, createTimecard, getTimecardList, deleteTimecard, deleteManyEmployess, accessToken, createAccessRights } = require("../controllers/employee");
const { getSalesSummary, getSalesByItem, getSalestByCategory, getSalesByEmployee, getSalesSummaryForDay, getSalesDaysSummary, getSalesByPaymentMethod } = require("../controllers/report");

const router = express.Router()
const storage = multer.memoryStorage();
const upload = multer({ storage });

//item
router.route("/category").post(category).get(categoryList)
router.route("/items").post(Item).get(ItemList)
router.route("/stocks").get(stocks)
router.route("/uploadImg").post(uploadImg)
router.route("/updateItem/:id").post(updateItems)
router.route("/getItemById/:id").get(getitemById)
router.route("/deleteItem").get(deleteItem)
router.route("/delete/:id").get(deleteManyItems)
router.get('/items_pos', ItemListPos)
// router.get('/items_Lists', itemsList)

// router.post('/itemcsv_upload',upload.single('file'), uploardCsv)
router.get('/addonitem', addOnItemList)

//category
router.get('/get_categoryitem', categoryItems)
router.get('/get_category',categories)
router.post('/edit_category', editCategory)
router.get('/category_detail/:id', getCatDetail)
router.post('/delete_category', deleteCategory)
router.post('/category_delete', categoryDelete)

//cart
router.post('/select_ordertype', selectOrderType)
router.get('/getcart', getcart)
router.post('/add_tocart', addToCart)
router.post('/update_cart', updateCart)
router.patch('/change_quantity', changeQuantity)
router.patch('/cancel_item', cancelCartItem)
router.post('/cancel_cart', cancelCart)

//customer
// router.post('/create_customer', createCustomer)
// router.post('/get_customer', getCustomer)
// router.get('/get_customerlist', getCustomerList)
// router.patch('/edit_customer', editCustomer)
// router.post('/delete_customer', deleteCustomer)

router.post('/create_customer', createCustomer)
router.post('/get_customer', getCustomer)
router.get('/get_customerlist', getCustomerList)
router.patch('/edit_customer', editCustomer)
router.post('/delete_customer', deleteCustomer)
router.get("/customers",customerList)
router.get("/deleteCustomers/:id",deleteCustomers)

//order
router.post('/place_order', order)
router.get('/get_order', getOrders)
router.get('/get_running_order', getRunningOrders)
router.post('/edit_order', getEditOrder)
router.post('/billing', billing)


//bookings
router.route("/table").post(createTable).get(getTableList)
router.route("/booking").post(createBooking).get(getDetailsOfBooking)

//transaction
// router.route("/transaction").get(transactionDetails)

router.get('/transction_data', getPaidOrders)

//employee
router.get('/employee', getEmployeeList)
router.get('/employeeid/:id', getEmployeeById)
router.post('/employee', register)
router.post('/delete_employee', deleteEmployee)
router.route("/deleteEmployees/:id").get(deleteManyEmployess)

// router.route("/timeCard").post(createTimecard).get(getTimecardList)
// router.route("/deleteTimecard").get(deleteTimecard)

router.route("/timeCard").post(createTimecard).get(getTimecardList)
router.route("/deleteTimecard/:id").get(deleteTimecard)

//sales report
router.get('/salessummary', getSalesSummary)
router.get('/salesbyitem', getSalesByItem)
router.get('/salesbycategory', getSalestByCategory)
router.get('/salesbyemployee', getSalesByEmployee)
router.get('/salessummarybyday', getSalesSummaryForDay)
router.get('/salesdayssummary', getSalesDaysSummary)
router.get('/salesbypayment', getSalesByPaymentMethod)

//modifiers
router.route("/modifier").post(createModifiers).get(getModifierOptions)
router.route("/deleteModifiers").post(deleteModifiers)

router.post('/accestoken', accessToken)

//accessRights
router.post("/accessPermissions",createAccessRights)

module.exports = router