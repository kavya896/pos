const Customer = require("../model/customer");
const Orders = require("../model/order");

exports.createCustomer = async (req, res) => {
  try {
    const { name, phone, email, DOB, address, suburb, country, customerCode, note } = req.body;
    const newVisitDate = new Date();
    const existCost = await Customer.findOne({ phone: phone });
    if (existCost) {
      await Customer.updateOne(
        { phone: phone },
        {
          $push: { dateOfvisit: newVisitDate },
          $inc: { totalVisit: 1 },
        }
      );
      res.status(200).send({
        success: true,
        existCost,
        message: "Customer Updated",
      });
    } else {
      const customer = await Customer.create({
        name,
        phone,
        email,
        DOB,
        address,
        suburb, country, customerCode, note,
        dateOfvisit: newVisitDate,
        totalVisit: 1,
      });
      res.status(200).send({
        success: true,
        customer,
        message: "Created new Customer",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const { phone } = req.body;
    const customer = await Customer.findOne({ phone });
    if (customer) {
      res.status(200).send({
        success: true,
        customer,
        message: "Customer found",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Customer Note FOund",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

exports.getCustomerList = async (req, res) => {
  try {
    const customers = await Customer.find();
    if (customers) {
      res.status(200).send({
        success: true,
        customers,
        message: "Customer found",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Customers Note FOund",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

exports.editCustomer = async (req, res) => {
  try {
    const { name, phone, email, DOB, address } = req.body
    await Customer.updateOne({ email: email }, {
      $set: {
        name: name,
        phone: phone,
        DOB: DOB,
        address: address
      }
    })
    res.status(200).send({
      success: true,
      message: "Customer updated success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
}

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.body
    await Customer.deleteOne({ _id: id })
    res.status(200).send({
      success: true,
      message: "Customer deleted success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
}

//pagination
// exports.customerList = async (req, res) => {
//   try {
//       // const pageNo = req.query.pageNo || 1
//       // const rowsPerPage = req.query.rowsPerPage || 10
//       // const skipPages = (pageNo - 1) * rowsPerPage
//       // if(!pageNo && !rowsPerPage){
//       //     res.send({ "message": "pageNo and rowsPerPage are required" })
//       // }else{
//       //     const count = (await Customer.find()).length
//       //     const list = await Customer.find().sort({ updatedAt: -1 }).limit(rowsPerPage).skip(skipPages)
//       //     const order = await Orders.find()
//       //     // for(var i=0;i<=list.length;i++){
//       //     //   order.forEach((item,index) => {
//       //     //     if(item.customerId.toString() == list[i]._id.toString() ){
//       //     //       list[i].totalAmount = list[i].totalAmount + item.grandTotal
//       //     //     }
//       //     //   });
//       //     // }

//       //     const totalPages = Math.floor(count / rowsPerPage) + 1

//       // res.send({ list, totalPages })
//       // }

//   } catch (err) {
//       console.log(err)
//   }
// }

exports.customerList = async (req, res) => {
  try {
    const pageNo = req.query.pageNo || 1
    const rowsPerPage = req.query.rowsPerPage || 10
    const skipPages = (pageNo - 1) * rowsPerPage
    if (!pageNo && !rowsPerPage) {
      res.send({ "message": "pageNo and rowsPerPage are required" })
    } else {
      const list = await Customer.find({})
      const order = await Orders.find({})
      for(var i = 0;i<list.length;i++){
        if(list[i].dateOfvisit.length>0){
          const order = await Orders.find({customerId:list[i]._id})
          if(order.length>0){
           
            const total = order[0].grandTotal
            const points = total/1000
            const update = await Customer.findByIdAndUpdate(list[i]._id,{totalAmount:total,pointBalance:points},{new:true})
           
          }
        }
      }
      const totalPages = Math.floor(list.length / rowsPerPage) + 1
      
      const totalList = await Customer.find({}).sort({ updatedAt: -1 }).limit(rowsPerPage).skip(skipPages)
      // console.log(".........",totalList,totalPages)
      res.send({ totalList, totalPages })
    }
  } catch (err) {
    console.log(err)
  }
}

exports.deleteCustomers = async (req, res) => {
  try {
      const arr = []
      arr.push(req.params.id)

      // console.log(arr.split(","))
      for (var i = 0; i < arr.length; i++) {
          var split = arr[i].split(",");  // just split once
          for (var j = 0; j < split.length; j++) {
              const customer = await Customer.findByIdAndDelete({ _id: split[j] })

          }
      }

      res.send({ "message": "deleted successfully" })
  } catch (err) {
      console.log(err)
  }
}