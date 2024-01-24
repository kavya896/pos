const Booking = require("../model/bookings")
const Table = require("../model/table")

exports.createTable = async(req,res)=>{
    try{
        const {tableNo,noOfPersons,description,available} = req.body
        const exists = await Table.find({tableNo})
        if(exists.length>0){
            res.status(400).send({"message":"TableNo. already exists"})
        }else{
            const table = await Table.create({tableNo,noOfPersons,description,available})
            await table.save()
            res.status(200).send(table)
        }
    }catch(err){
        console.log(err)
    }
}

exports.getTableList = async(req,res)=>{
    try{
        console.log("jjjjjj")
       const tables = await Table.find({})
       console.log(tables)
       res.send(tables)
    }catch(err){
        console.log(err)
    }
}

// exports.createBooking = async(req,res) =>{
//     try{
//         const {date,time,name,member,mobileNo,tableNos,note,advance,balance} = req.body
//         const tableAvailability = await Table.find({tableNo:tableNos})
//         console.log(tableNo,tableAvailability)
//         if(tableAvailability[0].available){
//             tableAvailability[0].available = false
//             await tableAvailability[0].save()
//             const booking = await Booking.create({date,time,customer:name,member,mobileNo,tableNo:tableNos,note,advance,balance})
//             await booking.save()
//             res.status(200).send(booking)
//         }else{
//             res.status(400).send({"message":"table is already booked"})
//         }
        
//     }catch(err){
//         console.log(err)
//     }
// }

exports.createBooking = async(req,res) =>{
    try{
        const {date,time,name,member,mobileNo,tableNos,note,advance,balance} = req.body
        console.log(date,time,name,member,mobileNo,tableNos,note,advance,balance)
        const tableAvailability = await Table.find({tableNo:tableNos})
        console.log(tableNos,tableAvailability)
        if(tableAvailability){
            tableAvailability[0].description = "reservered"
            tableAvailability[0].available = false
            await tableAvailability[0].save()
            const booking = await Booking.create({date,time,customer:name,member,mobileNo,tableNo:tableAvailability[0]._id,note,advance,balance})
            await booking.save()
            res.status(200).send(booking)
        }else{
            res.status(400).send({"message":"table is already booked"})
        }
    }catch(err){
        console.log(err)
    }
}
exports.getDetailsOfBooking = async(req,res)=>{
    try{
        const booking = await Booking.find({}).populate("tableNo")
        if(booking.length>0){
            res.status(200).send(booking)
        }else{
            res.status(400).send({"message":"no bookings of the day"})
        }
    }catch(err){
        console.log(err)
    }
}
