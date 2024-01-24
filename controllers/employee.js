const AccessPermission = require("../model/accessPermissions")
const Employee = require("../model/employee")
const Timecard = require("../model/timecard")
const { generateToken } = require("../middlewares/auth")


exports.register = async(req,res)=>{
    try{
        const {name,email,phone,role,posAcsessRight,backOfficeRight,totalHours,storename,password} = req.body
        const exists = await Employee.find({email:req.body.email})
        if(exists.length>0){
            res.send({"message":"email already exists"})
        }else{
            const employee = await Employee.create({name,email,phone,role,posAcsessRight,backOfficeRight,totalHours,storename,password})
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
// exports.getEmployeeList = async(req,res)=>{
//     try{
//         const pageNo = req.query.pageNo || 1
//         const rowsPerPage = req.query.rowsPerPage || 10
//         const search = req.query.search || ""
//         const pagesToSkip = (pageNo - 1)*rowsPerPage
//         const query = {
//             name: { $regex: search, $options: "i" }
//         }
//         const list = await Employee.find(query).sort({updatedAt:-1}).limit(rowsPerPage).skip(pagesToSkip)
//         res.send(list)
//     }catch(err){
//         console.log(err)
//     }
// }

exports.getEmployeeList = async(req,res)=>{
    try{
        const pageNo = req.query.pageNo || 1
        const rowsPerPage = req.query.rowsPerPage || 10
        const pagesToSkip = (pageNo - 1)*rowsPerPage
       

        const count = (await Employee.find()).length
        // const list = await Employee.find().sort({ updatedAt: -1 }).limit(rowsPerPage).skip(pagesToSkip)
        const list = await Employee.find().populate("timeCard").sort({ updatedAt: -1 }).limit(rowsPerPage).skip(pagesToSkip)
        const totalPages = Math.floor(count / rowsPerPage) + 1

    res.send({ list, totalPages })
    }catch(err){
        console.log(err)
    }
}

exports.deleteEmployee = async(req,res)=>{
    try {
      const { emplId } = req.body
      await Employee.deleteMany({ _id: { $in: emplId } })
      res.status(200).send({
        success:true,
        message:"Employee Deleted"
      })
    } catch (error) {
      console.log(error);
            res.status(500).send({
              success:false,
              message:"Server error"
            })
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

// exports.accessPermission = async(req,res)=>{
//     try {
//         const updatedData = req.body;
//         const accessPermissionId = req.params.id;

//         console.log(updatedData, "kkkkkkk", req.params.id);
    
//         const updatedDocument = await AccessPermission.findByIdAndUpdate(accessPermissionId, updatedData, { new: true });
    
//         if (!updatedDocument) {
//           return res.status(404).json({ message: 'Access Permission not found' });
//         }
    
//         res.json(updatedDocument);
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
// }

exports.accessToken = async(req,res)=>{
    try {
        const { email, expDate } = req.body
        console.log(email, expDate);
        const token = generateToken(email, "employee");
        console.log(token);
        const updateToken = await Employee.updateOne({email:email}, {
             $set: { 'accessToken.token': token, 'accessToken.expDate': expDate } 
        })
        res.status(200).send({message:"access token created"})
        console.log(updateToken);
    } catch (error) {
        console.log(error);
        send({ message: 'Internal Server Error' });
    }
}

// exports.createAccessRights = async(req,res) =>{
//     try{
//         const {name,pos,backOffice} = req.body
//         console.log(req.body)
//         const exists = await Employee.find({name})
//         if(exists){
//             var backOfficeAccessRight;
//             var posAccessRight;
//             if(pos){
//                 posAccessRight = true
//             }
//             if(backOffice){
//                 backOfficeAccessRight = true
//             }
//             const accessPermissions = await AccessPermission.create({name,posAccessRight,pos,backOfficeAccessRight,backOffice})
//             await accessPermissions.save()
//             res.send({"message":"Successful"})
//         }else{
//             res.send({"message":"name is invalid"})
//         }
//      }catch(err){
//         console.log(err)
//     }
// }

exports.createAccessRights = async(req,res) =>{
    try{
        const {name,pos,backOffice} = req.body
        console.log(req.body)
        const exists = await Employee.find({email:name})
        console.log(exists);
        if(exists){
            var backOfficeAccessRight;
            var posAccessRight;
            if(pos.length>0){
                posAccessRight = true

            const update = await Employee.findByIdAndUpdate(exists[0]._id,{posAcsessRight:true,backOfficeRight:false},{new:true})
            }
            if(backOffice.length>0){
                backOfficeAccessRight = true
                
            const update = await Employee.findByIdAndUpdate(exists[0]._id,{backOfficeRight:true,posAcsessRight:false},{new:true})
            }
            if(pos.length>0 && backOffice.length>0){

                const update = await Employee.findByIdAndUpdate(exists[0]._id,{backOfficeRight:true,posAcsessRight:true},{new:true})
                }
            const accessPermissions = await AccessPermission.create({name,posAccessRight,pos,backOfficeAccessRight,backOffice})
            
            await accessPermissions.save()
            
                
            const update = await Employee.findByIdAndUpdate(exists[0]._id,{accessrights:accessPermissions._id},{new:true})
            
            res.send({"message":"Successful"})
        }else{
            res.send({"message":"name is invalid"})
        }
     }catch(err){
        console.log(err)
    }
}
