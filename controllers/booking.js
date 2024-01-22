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

exports.createBooking = async(req,res) =>{
    try{
        const {date,time,customer,member,mobileNo,tableNo,note,advance,balance} = req.body
        const tableAvailability = await Table.findById(tableNo)
        if(tableAvailability.available){
            tableAvailability.available = false
            await tableAvailability.save()
            const booking = await Booking.create({date,time,customer,member,mobileNo,tableNo,note,advance,balance})
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
