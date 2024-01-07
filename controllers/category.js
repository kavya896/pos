const Category = require("../model/category")
const Item = require("../model/item")

exports.category = async (req, res) => {
    try {
        const { name, color, noOfItems, image } = req.body
        const exists = await Category.find({ name })

        if (exists.length > 0) {

            res.status(400).send({success:false, message: "name already exists" })
        } else {
            const category = await Category.create({ name, color, noOfItems, image })
            await category.save()
            res.status(200).send({success:true, category, message: "Category added success"})
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
          success:false,
          message:"Server Error"
        })
    }
}

exports.categories = async (req, res) => {
    try {
        const list = await Category.find({is_deleted:false})
        if (list.length > 0) {
            res.status(200).send({success:true, list})
        } else {
            res.status(400).send({success:false, message: "list is empty" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
          success:false,
          message:"Server Error"
        })
    }
}

exports.editCategory = async(req,res)=>{
    try {
        const { categoryName, image, categoryId, noOfItems, color} = req.body
        const existCategory = await Category.findOne({
          name: categoryName,
        });
        if(existCategory){
          const existId = existCategory._id.toString()
          if(existId === categoryId){
            await Category.updateOne({_id:categoryId},{$set:{
              image,
              noOfItems,
              color,
            }})
            res.status(200).send({
              success:true,
              message:"Category edited success"
            })
            
          }else{
            res.status(400).send({
              success:false,
              message:"Something went wrong"
          })
          }
        }else{await Category.updateOne({_id:categoryId},{
          $set:{
            name:categoryName,
            noOfItems,
            color,
            image:image || ''
          }
        })
        res.status(200).send({
          success:true,
          message:"Category edited success"
        })}
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success:false,
          message:"Server Error"
        })
      }
    }

    exports.getCatDetail = async(req,res)=>{
        try {
            const catId  = req.params.id
            const catData = await Category.findOne({_id:catId, is_deleted:false})
            if(catData){
              res.status(200).send({success:true, catData, message:"category found"})
            }else{
              res.status(500).send({success:false, message:"Something went wrong"})
            }
        } catch (error) {
            console.log(error);
        res.status(500).send({
          success:false,
          message:"Server Error"
        })
        }
    }

    exports.deleteCategory = async(req,res)=>{
        try {
          const { catId } = req.body
          const isProduct = await Item.find({'category._id':catId})
          if (isProduct.length > 0) {
            return res.status(409).send({
              message: 'Category has associated products. Do you want to delete the products and the category?',
              confirmationRequired: true
            });
          }
          await Category.updateOne({_id:catId},{$set:{
            is_deleted:true
          }})
          res.status(200).send({
            success:true,
            message:"Category Deleted"
          })
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success:false,
            message:"Server error"
          })
        }
      }
      