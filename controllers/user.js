const Admin = require("../model/admin")
const Category = require("../model/category")
const DishItem = require("../model/item")
const Ingredient = require("../model/ingredient")
const genPass = require("../config/bcript")
const { generateToken } = require("../middlewares/auth")

exports.login = async(req,res) =>{
    try{
        const email=req.body.email
        if(email){
        const {email,password} = req.body
        const user = await Admin.findOne({email})
        if(user){
            const checkPassword = await genPass.compairePass(password,user.password)
            // if(user[0].password == password){
                if(checkPassword){
                const token = generateToken(user._id, "user");
                user.password = undefined
                user.pin = undefined
                res.status(200).send({success:true, message: "user successfully login",
                token,
                user,
                role: "user",})
            }else{
                
                res.status(400).send({success:false, message:"credencials doesn't match"})
            }
        }
    }else{
        const user = await Admin.findOne({pin:req.body.pin})
        if(user){
            const token = generateToken(user._id, "user");
                user.password = undefined
                user.pin = undefined
                res.status(200).send({success:true, message: "user successfully login",
                token,
                user,
                role: "user",})
        }else{
            res.status(400).send({message:"credencials doesn't match"})
        }
    }
    }catch(err){
        console.log(err)
    }
}


exports.register = async(req,res)=>{
    try{
        const {name,role,email,password,pin} = req.body
        const newPassword = await genPass.password(password)
        const exists = await Admin.find({email})
        if(exists.length>0){
            res.status(400).send({message:"emailId already exists"})
        }else{
           
            const pinexists = await Admin.find({pin})
            
            if(pinexists.length>0){
                
            res.status(400).send({message:"pin already exists"})
            }else{
                const user = await Admin.create({name,role,email,password:newPassword,pin})
                await user.save()
                res.status(200).send(user)
            }
           
        }
    }catch(err){
        res.send(err)
    }
}

exports.category = async(req,res)=>{
    try{
        const name = req.body.name
        const exists = await Category.find({name})
        
        if(exists.length>0){
           
            res.status(400).send({message:"name already exists"})
        }else{
            
            const category = await Category.create({name})
            await category.save()
            res.status(200).send(category)
        }
    }catch(err){
        console.log(err)
    }
}

exports.categoryList = async(req,res) =>{
    try{
        const list = await Category.find({})
        if(list.length>0){
            res.status(200).send(list)
        }else{
            res.status(400).send({message:"list is empty"})
        }
    }catch(err){
        console.log(err)
    }
}

