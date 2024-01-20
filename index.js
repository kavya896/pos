const express = require("express")
const mongoose = require("mongoose")
const app= express()
const fileUpload = require("express-fileupload")


const cors = require("cors")
const Admin = require("./model/admin")
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(fileUpload({
    useTempFiles:true
}))
app.use("/qrcode",require("./routes/qrcode"))
app.use("/employee",require("./routes/employee"))

app.use("/api",require("./routes/user"))
app.use("/api/v1",require("./routes/items"))
mongoose.connect("mongodb+srv://kavyareddy:kavyareddy@cluster0.msabz.mongodb.net/pos").then(()=>{
    console.log("db is connected successfully")
})




app.listen(5000,(req,res)=>{
    console.log("port is running at 5000")
})