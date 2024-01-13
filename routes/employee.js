const express = require("express")
const { register, createTimecard, getEmployeeById, getEmployeeList } = require("../controllers/employee")
const router = express.Router()

router.route("/").post(register).get(getEmployeeList)
// router.route("/register").post(register)
router.route("/createTimeCard").post(createTimecard)

router.route("/:id").get(getEmployeeById)
module.exports = router