const Admin = require("../model/admin")
const Category = require("../model/category")
const DishItem = require("../model/item")
const Ingredient = require("../model/ingredient")
const genPass = require("../config/bcript")

exports.login = async(req,res) =>{
    try{
        const email=req.body.email
        if(email){
        const {email,password} = req.body
        const user = await Admin.find({email})
        if(user){
            const checkPassword = await genPass.compairePass(password,user[0].password)
            // if(user[0].password == password){
                if(checkPassword){
                const token = generateToken(user._id, "user");
                res.status(200).send({success:true,user,  message: "user successfully login",
                name: user.name,
                token,
                userId: user._id,
                role: "user",})
            }else{
                
                res.status(400).send({success:false, message:"credencials doesn't match"})
            }
        }
    }else{
        const user = await Admin.find({pin:req.body.pin})
        if(user.length>0){
            res.status(200).send(user)
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

// exports.dishes = async(req,res) =>{
//     try{
//         const {name,price,typeOfDishItem,image} = req.body
//         const exists = await DishItem.find({name:req.body.name})
//         console.log(exists.length)
//         if(exists.length>0){
//             res.status(400).json({message:"this item already exists"})
//         }else{
//             const dish = await DishItem.create({name,price,typeOfDishItem,image})
//             await dish.save()
//             res.status(200).json({message:"dish created successfully",dish})
//         }
        
//     }catch(err){
//         console.log(err)
//     }
// }

// exports.itemsByType = async(req,res) =>{
//     try{
//         if(req.query){
//             const items = await DishItem.find(req.query)
//             if(items.length>0){
//                 res.status(200).json({listOfItems:items})
//             }else{
//                 res.status(400).json({message:"no items of this type available now"})
//             }
//         }else{
//             const items = await DishItem.findAll({})
//             res.status(200).json({listOfItems:items})
//         }
       
//     }catch(err){
//         console.log(err)
//     }
// } 


// exports.ingredient = async(req,res)=>{
//     try{
//         const {name,description,addtype}=req.body
//         const exists = await Ingredient.find({name})
//         if(exists.length>0){
//             res.status(400).send({message:"unit/category name already exists"})
//         }else{
//             const ingredient = await Ingredient.create({name,description,addtype})
//             await ingredient.save()
//             res.status(200).send(ingredient)
//         }
//     }catch(err){
//         res.status(400).send(err)
//     }
// }

// exports.listIngredientCategory = async(req,res)=>{
//     try{
//         const list = await Ingredient.find({addtype:"category"})
//         if(list.length<0){
//             res.status(400).send({message:"List is empty"})
//         }else{
//             res.status(200).send(list.reverse())
//         }
//     }catch(err){
//         res.status(400).send(err)
//     }
// }