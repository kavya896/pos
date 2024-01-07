const jwt = require('jsonwebtoken');
require('dotenv').config()
const admin = require('../model/admin');
const SECRETCODE = process.env.SECRETCODE


module.exports = {
  generateToken:(id,role)=>{
      const token = jwt.sign({id,role},SECRETCODE)
      return token
  },

  verifyUserToken:async(req,res,next)=>{
      try{
          let token = req.headers.authorization
          if(!token){
              console.log('token illa ughh')
              return res.status(403).json({errmsg:'Access denied please Login...'})
          }

          if(token.startsWith('Bearer')){
             console.log('token ind guys')
             token = token.slice(7,token.length).trimLeft()
          }

          const verified = jwt.verify(token,SECRETCODE)
          if(verified.role === 'user'){

              const user = await userModel.findOne({_id:verified.id});
              if(user.isBlocked){
                  return res.status(403).json({errmsg:'user is blocked by admin'})
              }else{
                  req.payload = verified
                  next()
              }
              }else{
                  req.status(403).json({errmsg:'Access is denied please Login...'})
              }
          }catch (error){
             res.status(500).json({errmsg:'server error'})
          }
      }
  }
