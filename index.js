const express = require("express")
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const app= express()
const cors = require("cors")

app.use(cors())
// app.use(express.json())
app.use(express.json({limit : "10mb"}))
app.use("/api",require("./routes/user"))
app.use("/api/v1",require("./routes/items"))

dotenv.config()
mongoose.connect("mongodb+srv://kavyareddy:kavyareddy@cluster0.msabz.mongodb.net/pos").then(()=>{
    console.log("db is connected successfully")
})


app.listen(5000,(req,res)=>{
    console.log("port is running at 5000")
})