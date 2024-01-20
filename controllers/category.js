const Category = require("../model/category")
const Item = require("../model/item")

exports.category = async (req, res) => {
    try {
        const { name, color, noOfItems, image } = req.body
        const exists = await Category.findOne({ name })

        if (exists) {
            res.status(400).send({success:false, message: "name already exists" })
        } else {
            const category = await Category.create({ name, color, noOfItems, image })
            // await category.save()
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
      const {page = 1, limit = 10} = req.query
        const length = await Category.find({}).countDocuments() 
        console.log(length);
        const skip = (page - 1) * limit

        const catList = await Category.find({}).sort({_id: -1}).skip(skip).limit(parseInt(limit))
        console.log(catList);
        if (catList.length > 0) {
            res.status(200).send({success:true, catList})
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

// exports.editCategory = async(req,res)=>{
//     try {
//         const { name, image, categoryId, noOfItems, color} = req.body
//         const existCategory = await Category.findOne({
//           name: name,
//         });
//         if(existCategory){
//           const existId = existCategory._id.toString()
//           if(existId === categoryId){
//             await Category.updateOne({_id:categoryId},{$set:{
//               image,
//               noOfItems,
//               color,
//             }})
//             res.status(200).send({
//               success:true,
//               message:"Category edited success"
//             })
            
//           }else{
//             res.status(400).send({
//               success:false,
//               message:"Something went wrong"
//           })
//           }
//         }else{await Category.updateOne({_id:categoryId},{
//           $set:{
//             name:name,
//             noOfItems,
//             color,
//             image:image || ''
//           }
//         })
//         res.status(200).send({
//           success:true,
//           message:"Category edited success"
//         })}
//       } catch (error) {
//         console.log(error);
//         res.status(500).send({
//           success:false,
//           message:"Server Error"
//         })
//       }
//     }
exports.editCategory = async (req, res) => {
  try {
    const { id, name, color } = req.body;
   
    const catName = await Category.findOne({ _id: id, name: name });
    if (catName) {
      await Category.updateOne({ name }, { $set: { color: color } });
      console.log("Category exists, updated color");
      res.status(200).send({ success: true, message: "Category Edited Success" });
    } else {
      const isCatExist = await Category.findOne({name});
      if (isCatExist) {
        res.status(400).send({ success: false, message: "Category Name exists" });
      } else {
        await Category.updateOne({ _id: id }, { $set: { color: color, name: name } });
        console.log("Category Edited Success");
        res.status(200).send({ success: true, message: "Category Edited Success" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server Error"
    });
  }
};


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

exports.categoryDelete = async(req,res)=>{
  try {
    const { id } = req.body
    await Category.deleteMany({ _id: { $in: id } })
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
      