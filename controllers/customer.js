const Customer = require("../model/cumstomer");

exports.createCustomer = async (req, res) => {
  try {
    const { name, phone, email, DOB, address } = req.body;
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
    if(customers){
        res.status(200).send({
          success: true,
          customers,
          message: "Customer found",
        });
    }else{
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

exports.editCustomer = async(req,res)=>{
    try {
        const { name, phone, email, DOB, address } = req.body
        await Customer.updateOne({email:email},{
            $set:{
                name:name,
                phone:phone,
                DOB:DOB,
                address:address
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
 
exports.deleteCustomer = async(req,res)=>{
    try {
        const {id} = req.body
        await Customer.deleteOne({_id:id})
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