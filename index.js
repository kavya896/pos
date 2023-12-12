const express = require("express")
const mongoose = require("mongoose")
const app= express()
const Admin = require("./model/admin")
app.use(express.json())
app.use("/api",require("./routes/user"))
mongoose.connect("mongodb+srv://kavyareddy:kavyareddy@cluster0.msabz.mongodb.net/pos").then(()=>{
    console.log("db is connected successfully")
})


app.post("/",async(req,res)=>{
    try{
        const {email,password} = req.body
        const admin =await Admin.create({email,password}) 
        await admin.save()
        res.json({message:"admin logged-in successfully"})
    }catch(err){
        res.send(err)
    }
})

app.listen(5000,(req,res)=>{
    console.log("port is running at 5000")
})