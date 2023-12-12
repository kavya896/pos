const Admin = require("../model/admin")


exports.Login = async(req,res) =>{
    try{
        const {email,password} = req.body
        const user = await Admin.find({email})
        if(user){
            if(user[0].password == password){
                res.status(200).json({message:"logged-in successfully",user})
            }
        }
    }catch(err){
        console.log(err)
    }
}