// const Category = require("../model/category")
// const Item = require("../model/item")
// const Stock = require("../model/stocks")

// exports.categoryList = async (req, res) => {
//     try {
//         const list = await Category.find({})
//         if (list.length > 0) {
//             res.status(200).send({success:true, list})
//         } else {
//             res.status(400).send({success:false, message: "list is empty" })
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({
//           success:false,
//           message:"Server Error"
//         })
//     }
// }
// exports.Item = async (req, res) => {
//     try {
//         const { name,  description, available, soldBy, price, cost, SKU, composite, inStock, lowStock, variantOptionName, variantOptionValue, spiceLevel, colors } = req.body
//         const category = req.body.catg || req.body.category
//         const exists = await Item.find({ name })
//         if (exists.length > 0) {
//             res.status(400).send({ "message": "Item already exists" })
//         } else {
//             const updateCategory = await Category.find({ name: category })
//             if (updateCategory.length > 0) {
//                 updateCategory[0].noOfItems = updateCategory[0].noOfItems + 1
//                 await updateCategory[0].save()

//             }
//             const item = await Item.create({ name, category, description, available, soldBy, price, cost, SKU, composite, inStock, lowStock, variantOptionName, variantOptionValue, spiceLevel, colors })
//             await item.save()
//             res.status(200).send(item)
//         }

//     } catch (err) {
//         console.log(err)
//     }
// }

// exports.ItemList = async (req, res) => {
//     try {

//         if (req.query) {
//                 const pageNo = req.query.pageNo || 1
//                 const rowsPerPage = req.query.rowsPerPage || 10
//                 const category = req.query.category || ""
//                 const stocks = req.query.stocks || ""
//                 const search = req.query.search || ""

//                 const query = {
//                     name: { $regex: search, $options: "i" }
//                 }
//                 if(category == "All Items"){
//                     query.category={$regex:"",$options:"i" }
//                 }else{
//                     query.category={$regex:category,$options:"i" }
//                 }
//                 if(stocks == "All"){
//                     query.inStock ={$regex:"",$options:"i" }
//                 }else{
//                     query.inStock={$regex:stocks,$options:"i" }
//                 }

//                 const skipPages = (pageNo - 1) * rowsPerPage

//                 if (!pageNo && !rowsPerPage) {
//                     res.json({ "message": "pageNo and rowsPerPage are required" })
//                 } else {

//                     const list = await Item.find(query).sort({updatedAt:-1}).limit(rowsPerPage).skip(skipPages)

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

// exports.stocks = async(req,res)=>{
//     try{
//        const stock = await Stock.find({})
//        res.send(stock)
//     }catch(err){
//         console.log(err)
//     }
// }
// // exports.ItemList = async (req, res) => {
// //     try {

// //         if (req.query.pageNo) {
// //                 const pageNo = req.query.pageNo

// //                 const rowsPerPage = req.query.rowsPerPage
// //                 console.log(pageNo, rowsPerPage)
// //                 const skipPages = (pageNo - 1) * rowsPerPage
// //                 console.log(skipPages)
// //                 if (!pageNo && !rowsPerPage) {
// //                     res.json({ "message": "pageNo and rowsPerPage are required" })
// //                 } else {
// //                     const list = await Item.find({}).limit(rowsPerPage).skip(skipPages)
// //                     console.log("from pagination")
// //                     res.send(list)
// //                 }
// //             }else{
// //                 const items = await Item.find({}).limit(10)
// //                 res.send(items)
// //             }

// //     } catch (err) {
// //         res.status(400).send(err)
// //     }
// // }

const multer = require("multer");
const csv = require("csv-parse");
const fs = require("fs");

const Category = require("../model/category");
const Item = require("../model/item");
const Stock = require("../model/stocks");
const cloudinary = require("../utils/cloudinary");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// exports.uploardCsv = async (req, res) => {
//     try {
//       const {csvFile} = await req.body
//   console.log(req.body.csvFile);
//     //   if (file && file.buffer) {
//         const csvData = parseCSV(csvFile);
//         const documents = csvData.map((row) => ({
//           name: row[0],
//           category: row[1],
//           discription: row[2],
//           price: row[3],
//         }));
//         const insertedData = await Item.insertMany(documents);
//         res.status(200).send({ success: true, insertedData, message: 'CSV imported successfully' });
//     //   } else {
//     //     res.status(400).json({ message: 'File not uploaded' });
//     //   }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: 'Error processing file' });
//     }
//   };

//   function parseCSV(file) {
//     const csvData = csv(file.buffer.toString());
//     return csvData;
//   }

exports.category = async (req, res) => {
  try {
    const { name, color, noOfItems } = req.body;
    const exists = await Category.find({ name });

    if (exists.length > 0) {
      res.status(400).send({ message: "name already exists" });
    } else {
      const category = await Category.create({ name, color, noOfItems });
      await category.save();
      res.status(200).send(category);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.categoryList = async (req, res) => {
  try {
    const list = await Category.find({});
    if (list.length > 0) {
      res.status(200).send(list);
    } else {
      res.status(400).send({ message: "list is empty" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.Item = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      available,
      soldBy,
      price,
      cost,
      SKU,
      composite,
      inStock,
      lowStock,
      variantOptionName,
      variantOptionValue,
      spiceLevel,
      color,
      addOnitem,
    } = req.body;
    const category = req.body.catg || req.body.category;
    const exists = await Item.find({ name });
    if (exists.length > 0) {
      res.status(400).send({ message: "Item already exists" });
    } else {
      const updateCategory = await Category.find({ name: category });
      if (updateCategory.length > 0) {
        updateCategory[0].noOfItems = updateCategory[0].noOfItems + 1;
        await updateCategory[0].save();
      }
      const item = await Item.create({
        name,
        category,
        image,
        description,
        available,
        soldBy,
        price,
        cost,
        SKU,
        composite,
        inStock,
        lowStock,
        variantOptionName,
        variantOptionValue,
        spiceLevel,
        color,
        addOnitem
      });
    //   await item.save();
      res.status(200).send(item);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.uploadImg = async (req, res) => {
  try {
    const file = req.files.image;

    const result = cloudinary.uploader.upload(file.tempFilePath, {
      folder: "pos",
    });
    console.log((await result).secure_url);
    res.send((await result).secure_url);
  } catch (err) {
    console.log(err);
  }
};

// exports.ItemList = async (req, res) => {
//     try {

//         if (req.query) {
//                 const pageNo = req.query.pageNo || 1
//                 const rowsPerPage = req.query.rowsPerPage || 10
//                 const category = req.query.category || ""
//                 const stocks = req.query.stocks || ""
//                 const search = req.query.search || ""

//                 const query = {
//                     name: { $regex: search, $options: "i" }
//                 }
//                 if(category == "All Items"){
//                     query.category={$regex:"",$options:"i" }
//                 }else{
//                     query.category={$regex:category,$options:"i" }
//                 }
//                 if(stocks == "All"){
//                     query.inStock ={$regex:"",$options:"i" }
//                 }else{
//                     query.inStock={$regex:stocks,$options:"i" }
//                 }

//                 const skipPages = (pageNo - 1) * rowsPerPage

//                 if (!pageNo && !rowsPerPage) {
//                     res.json({ "message": "pageNo and rowsPerPage are required" })
//                 } else {

//                     const count = (await Item.find(query)).length
//                     const list = await Item.find(query).sort({updatedAt:-1}).limit(rowsPerPage).skip(skipPages)
//                     const totalPages =Math.floor( count/rowsPerPage)+1

//                     res.send({list,totalPages})
//                 }
//             }else{
//                 const count = (await Item.find({})).length
//                 const list = await Item.find({}).limit(10)
//                 const totalPages = count/10
//                 res.send({list,totalPages})
//             }

//     } catch (err) {
//         res.status(400).send(err)
//     }
// }

exports.ItemList = async(req,res)=>{
    try {
        const items = await Item.find()
        if(items){
            res.status(200).send({
                success:true,
                items,
                message:"Items List"
            })
        }else{
            res.status(400).send({
                success: false,
                message: "Iten not fount",
              });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
}
exports.stocks = async (req, res) => {
  try {
    const stock = await Stock.find({});
    res.send(stock);
  } catch (err) {
    console.log(err);
  }
};

exports.addOnItemList = async (req, res) => {
  try {
    const addOnItems = await Item.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $match: {
          "category.name": "Add On Items",
        },
      },
    ]).exec();

    if (addOnItems) {
      res.status(200).send({
        success: true,
        addOnItems: addOnItems,
        message: "Add On Items List",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Items not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    console.log(req.params.id);
    const item = await Item.findByIdAndDelete({ _id: req.params.id });

    res.send({ message: "deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};

exports.updateItems = async (req, res) => {
  try {
    const {
      name,
      category,
      image,
      description,
      available,
      soldBy,
      price,
      cost,
      SKU,
      composite,
      inStock,
      lowStock,
      variantOptionName,
      variantOptionValue,
      spiceLevel,
      colors,
    } = req.body;
    const update = await Item.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name,
        category,
        image,
        description,
        available,
        soldBy,
        price,
        cost,
        SKU,
        composite,
        inStock,
        lowStock,
        variantOptionName,
        variantOptionValue,
        spiceLevel,
        colors,
      },
      { new: true }
    );
    await update.save();
    res.send(update);
  } catch (err) {
    console.log(err);
  }
};

exports.getitemById = async (req, res) => {
  try {
    const item = await Item.findById({ _id: req.params.id });

    if (item) {
      const category = await Category.find({ name: item.category });
      const newlist = {};
      newlist.item = item;
      newlist.category = category[0];

      res.send(newlist);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getCategoryByName = async (req, res) => {
  try {
    const category = await Category.find({ name: req.params.name });
    if (category.length > 0) {
      res.send(category);
    }
  } catch (err) {
    console.log(err);
  }
};

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

exports.categoryItems = async(req,res)=>{
  try {
    const { id } = req.query
    const catItems = await Item.find({category:id})
    console.log(catItems);
    res.status(200).send({
      success:true,
      catItems,
      message:"Category Items"
    })
  } catch (error) {
    console.error(error);
      res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}