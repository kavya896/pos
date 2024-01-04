const Category = require("../model/category")
const Item = require("../model/item")
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
        const { name, category, description, available, soldBy, price, cost, SKU, composite, inStock, lowStock, variantOptionName, variantOptionValue, spiceLevel, color } = req.body
        const exists = await Item.find({ name })
        if (exists.length > 0) {
            res.status(400).send({ "message": "Item already exists" })
        } else {
            const updateCategory = await Category.find({ name: category })
            if (updateCategory.length > 0) {
                updateCategory[0].noOfItems = updateCategory[0].noOfItems + 1
                await updateCategory[0].save()

            }
            const item = await Item.create({ name, category, description, available, soldBy, price, cost, SKU, composite, inStock, lowStock, variantOptionName, variantOptionValue, spiceLevel, color })
            await item.save()
            res.status(200).send(item)
        }

    } catch (err) {
        console.log(err)
    }
}

exports.ItemList = async (req, res) => {
    try {
       
        
        if (req.query.pageNo) {
                const pageNo = req.query.pageNo

                const rowsPerPage = req.query.rowsPerPage
                console.log(pageNo, rowsPerPage)
                const skipPages = (pageNo - 1) * rowsPerPage
                console.log(skipPages)
                if (!pageNo && !rowsPerPage) {
                    res.json({ "message": "pageNo and rowsPerPage are required" })
                } else {
                    const list = await Item.find({}).limit(rowsPerPage).skip(skipPages)
                    console.log("from pagination")
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

exports.pagination = async (req, res) => {
    try {
        const pageNo = req.query.pageNo

        const rowsPerPage = req.query.rowsPerPage
        console.log(pageNo, rowsPerPage)
        const skipPages = (pageNo - 1) * rowsPerPage
        console.log(skipPages)
        if (!pageNo && !rowsPerPage) {
            res.json({ "message": "pageNo and rowsPerPage are required" })
        } else {
            const list = await Item.find({}).limit(rowsPerPage).skip(skipPages)
            console.log("from pagination")
            res.send(list)
        }



    } catch (err) {
        res.status(400).send(err)
    }
}