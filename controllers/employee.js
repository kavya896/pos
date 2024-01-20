const Employee = require("../model/employee")
const Timecard = require("../model/timecard")

exports.register = async(req,res)=>{
    try{
        const {name,email,phone,role,posAcsessRight,backOfficeRight,totalHours,storename} = req.body
        const exists = await Employee.find({email:req.body.email})
        if(exists.length>0){
            res.send({"message":"email already exists"})
        }else{
            const employee = await Employee.create({name,email,phone,role,posAcsessRight,backOfficeRight,totalHours,storename})
            await employee.save()
            res.send(employee)
        }

       
    }catch(err){
        console.log(err)
    }
}

exports.createTimecard = async(req,res)=>{
    try{
        const {employee,clockInDate,clockOutDate,clockInTime,clockOutTime} = req.body
        const findEmployee = await Employee.findById(employee)
       
        if(findEmployee){
            
            const timecard = await Timecard({employee,clockInDate,clockOutDate,clockInTime,clockOutTime})
            await timecard.save()

            findEmployee.timeCard = timecard._id
            await findEmployee.save()

            res.send(timecard)
        }else{
            res.send({"message":"employee doesn't exist"})
        }
        
    }catch(err){
        console.log(err)
    }
}

exports.getEmployeeById = async(req,res)=>{
    try{
        const list = await Employee.findById(req.params.id).populate("timeCard")
        if(list){
            res.send(list)
        }else{
            res.send({"message":"Employee doesn't exists"})
        }
    }catch(err){
        console.log(err)
    }
}

exports.getEmployeeList = async(req,res)=>{
    try{
        const pageNo = req.query.pageNo || 1
        const rowsPerPage = req.query.rowsPerPage || 10
        const search = req.query.search || ""
        const pagesToSkip = (pageNo - 1)*rowsPerPage
        const query = {
            name: { $regex: search, $options: "i" }
        }
        const list = await Employee.find(query).sort({updatedAt:-1}).limit(rowsPerPage).skip(pagesToSkip)
        res.send(list)
    }catch(err){
        console.log(err)
    }
}