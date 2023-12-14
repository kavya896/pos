const express = require("express")
const mongoose = require("mongoose")
const app= express()
const cors = require("cors")
const Admin = require("./model/admin")
app.use(cors())
app.use(express.json())
app.use("/api",require("./routes/user"))
mongoose.connect("mongodb+srv://kavyareddy:kavyareddy@cluster0.msabz.mongodb.net/pos").then(()=>{
    console.log("db is connected successfully")
})




app.listen(5000,(req,res)=>{
    console.log("port is running at 5000")
})