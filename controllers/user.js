const Admin = require("../model/admin")
const DishItem = require("../model/dishes")

exports.login = async(req,res) =>{
    try{
        const {email,password} = req.body
        const user = await Admin.find({email})
        if(user){
            if(user[0].password == password){

                res.status(200).send({"user":user})
            }else{
                
                res.status(400).send({message:"credencials doesn't match"})
            }
        }
    }catch(err){
        console.log(err)
    }
}

exports.dishes = async(req,res) =>{
    try{
        const {name,price,typeOfDishItem,image} = req.body
        const exists = await DishItem.find({name:req.body.name})
        console.log(exists.length)
        if(exists.length>0){
            res.status(400).json({message:"this item already exists"})
        }else{
            const dish = await DishItem.create({name,price,typeOfDishItem,image})
            await dish.save()
            res.status(200).json({message:"dish created successfully",dish})
        }
        
    }catch(err){
        console.log(err)
    }
}

exports.itemsByType = async(req,res) =>{
    try{
        if(req.query){
            const items = await DishItem.find(req.query)
            if(items.length>0){
                res.status(200).json({listOfItems:items})
            }else{
                res.status(400).json({message:"no items of this type available now"})
            }
        }else{
            const items = await DishItem.findAll({})
            res.status(200).json({listOfItems:items})
        }
       
    }catch(err){
        console.log(err)
    }
} 