
const Category = require("../model/category")
const Item = require("../model/item")
const Stock = require("../model/stocks")

exports.category = async (req, res) => {
    try {
        const { name, color, noOfItems } = req.body
        const exists = await Category.find({ name })

        if (exists.length > 0) {

            res.status(400).send({ message: "name already exists" })
        } else {

            const category = await Category.create({ name, color, noOfItems })
            await category.save()
            res.status(200).send(category)
        }
    } catch (err) {
        console.log(err)
    }
}

exports.categoryList = async (req, res) => {
    try {
        const list = await Category.find({})
        if (list.length > 0) {
            res.status(200).send(list)
        } else {
            res.status(400).send({ message: "list is empty" })
        }
    } catch (err) {
        console.log(err)
    }
}

exports.Item = async (req, res) => {
    try {
        const { name,  description, available, soldBy, price, cost, SKU, composite, inStock, lowStock, variantOptionName, variantOptionValue, spiceLevel, colors } = req.body
        const category = req.body.catg || req.body.category
        const exists = await Item.find({ name })
        if (exists.length > 0) {
            res.status(400).send({ "message": "Item already exists" })
        } else {
            const updateCategory = await Category.find({ name: category })
            if (updateCategory.length > 0) {
                updateCategory[0].noOfItems = updateCategory[0].noOfItems + 1
                await updateCategory[0].save()

            }
            const item = await Item.create({ name, category, description, available, soldBy, price, cost, SKU, composite, inStock, lowStock, variantOptionName, variantOptionValue, spiceLevel, colors })
            await item.save()
            res.status(200).send(item)
        }

    } catch (err) {
        console.log(err)
    }
}

exports.ItemList = async (req, res) => {
    try {
       
        
        if (req.query) {
                const pageNo = req.query.pageNo || 1
                const rowsPerPage = req.query.rowsPerPage || 10
                const category = req.query.category || ""
                const stocks = req.query.stocks || ""
                const search = req.query.search || ""
                
                const query = {
                    name: { $regex: search, $options: "i" }
                }
                if(category == "All Items"){
                    query.category={$regex:"",$options:"i" }  
                }else{
                    query.category={$regex:category,$options:"i" } 
                }
                if(stocks == "All"){
                    query.inStock ={$regex:"",$options:"i" }  
                }else{
                    query.inStock={$regex:stocks,$options:"i" } 
                }
                

                const skipPages = (pageNo - 1) * rowsPerPage
                
                if (!pageNo && !rowsPerPage) {
                    res.json({ "message": "pageNo and rowsPerPage are required" })
                } else {
                    console.log(query)
                    const list = await Item.find(query).sort({updatedAt:-1}).limit(rowsPerPage).skip(skipPages)
                    
                    res.send(list)
                }
            }else{
                const items = await Item.find({}).limit(10)
                res.send(items)
            }
        
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.stocks = async(req,res)=>{
    try{
       const stock = await Stock.find({})
       res.send(stock)
    }catch(err){
        console.log(err)
    }
}
// exports.ItemList = async (req, res) => {
//     try {
       
        
//         if (req.query.pageNo) {
//                 const pageNo = req.query.pageNo

//                 const rowsPerPage = req.query.rowsPerPage
//                 console.log(pageNo, rowsPerPage)
//                 const skipPages = (pageNo - 1) * rowsPerPage
//                 console.log(skipPages)
//                 if (!pageNo && !rowsPerPage) {
//                     res.json({ "message": "pageNo and rowsPerPage are required" })
//                 } else {
//                     const list = await Item.find({}).limit(rowsPerPage).skip(skipPages)
//                     console.log("from pagination")
//                     res.send(list)
//                 }
//             }else{
//                 const items = await Item.find({}).limit(10)
//                 res.send(items)
//             }
        
//     } catch (err) {
//         res.status(400).send(err)
//     }
// }
