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
        const {email,clockInDate,clockOutDate,clockInTime,clockOutTime,totalTime} = req.body
        const findEmployee = await Employee.find({email})
       console.log(findEmployee)
        if(findEmployee.length>0){
            console.log(findEmployee[0]._id)
            const timecard = await Timecard.create({employee:findEmployee[0]._id,clockInDate,clockOutDate,clockInTime,clockOutTime,totalTime})
            await timecard.save()
            console.log(timecard)
            const update = await Employee.findByIdAndUpdate(findEmployee[0]._id,{timeCard:timecard._id},{new:true})
            

            res.send(timecard)
        }else{
            res.send({"message":"employee doesn't exist"})
        }
        
    }catch(err){
        console.log(err)
    }
}
exports.getTimecardList = async(req,res)=>{
    try{
        const pageNo = req.query.pageNo || 1
        const rowsPerPage = req.query.rowsPerPage || 10
        // const search = req.query.search || ""
        const pagesToSkip = (pageNo - 1)*rowsPerPage
        // const query = {
        //     name: { $regex: search, $options: "i" }
        // }
       

        const count = (await Timecard.find()).length
        const list = await Timecard.find().populate("employee").sort({ updatedAt: -1 }).limit(rowsPerPage).skip(pagesToSkip)
        const totalPages = Math.floor(count / rowsPerPage) + 1

    res.send({ list, totalPages })
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
        // const search = req.query.search || ""
        const pagesToSkip = (pageNo - 1)*rowsPerPage
        // const query = {
        //     name: { $regex: search, $options: "i" }
        // }
       

        const count = (await Employee.find()).length
        const list = await Employee.find().sort({ updatedAt: -1 }).limit(rowsPerPage).skip(pagesToSkip)
        const totalPages = Math.floor(count / rowsPerPage) + 1

    res.send({ list, totalPages })
    }catch(err){
        console.log(err)
    }
}


exports.deleteManyEmployess = async (req, res) => {
    try {
        const arr = []
        arr.push(req.params.id)
        console.log(arr)
        // console.log(arr.split(","))
        for (var i = 0; i < arr.length; i++) {
            var split = arr[i].split(",");  // just split once
            for (var j = 0; j < split.length; j++) {
                const item = await Employee.findByIdAndDelete({ _id: split[j] })

            }
        }

        res.send({ "message": "deleted successfully" })
    } catch (err) {
        console.log(err)
    }
}

exports.deleteTimecard = async (req, res) => {
    try {
        const arr = []
        arr.push(req.params.id)
        console.log(arr)
        // console.log(arr.split(","))
        for (var i = 0; i < arr.length; i++) {
            var split = arr[i].split(",");  // just split once
            for (var j = 0; j < split.length; j++) {
                const item = await Timecard.findByIdAndDelete({ _id: split[j] })

            }
        }

        res.send({ "message": "deleted successfully" })
    } catch (err) {
        console.log(err)
    }
}