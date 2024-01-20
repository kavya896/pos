const Cart = require("../model/cart");
const Customer = require("../model/cumstomer");
const Orders = require("../model/order");

let newOrder;
  
  exports.order = async (req, res) => {
    try {
      const {billing, payment, addressIndex, orderStatus,paymentStatus, cartData, total, grandTotal, discount, tax } = req.body;
      const customer = await Customer.findOne({ _id: cartData.customer });
      // const address = customer.address[addressIndex];
      const cart = await Cart.findOne({ _id: cartData._id })
        .populate("items.itemId");
        const items = cart.items.map((item) => ({
        product: item.itemId,
        quantity: item.quantity,
        price: item.price,
        addOnitem: item.addOnitem,
        preparationNote:item.preparationNote
      }));

      if(cart.odrderId){
        const order = await Orders.updateOne({_id:cart.odrderId}, {
          $set:{
          employeeId:cart.employeeId,
          item:items,
          totalPrice:total,
          tax:tax,
          discount:discount,
          grandTotal:grandTotal,
          orderType:cart.orderType,
          tableNumber:cart.tableNumber, 
          tableNumber:cart.tableNumber,
          orderStatus:orderStatus,
          paymentStatus:paymentStatus,
          // address:
          paymentType: {
            cash: {
              method:payment.method || "CASH",
              amount:payment.amount || 0,},
            // card: {
            //   cardNo: payment || "CARD",
            //   amount: payment || 0,
            // },
          } || "",
          }
        })
        if(billing){
          await Cart.deleteOne({_id:cartData.cartId})
          res.status(200).send({
            success: true,
            order,
            message: "paid bill success",
          });
        }else{
        await Cart.updateOne({ _id: cartData._id },{
          $set:{
            is_place_order:true
          }
        });
        res.status(200).send({
          success: true,
          order,
          message: "order updated success",
        });
      }
      
      }else{
        const order = await Orders.create({
          cartId:cart._id,
          billNumber:cart.billNumber,
          customerId:customer._id,
          employeeId:cart.employeeId,
          item:items,
          totalPrice: total,
          discount: discount,
          tax:tax,
          grandTotal: grandTotal,
          orderType:cart.orderType,
          tableNumber:cart.tableNumber,
          tableNumber:cart.tableNumber,
          orderStatus:orderStatus,
          paymentStatus:paymentStatus,
          // address:
          paymentType: {
            cash: {
              method:payment.method || "CASH",
              amount:payment.amount || 0
            },
            // card: {
            //   cardNo: payment || "CARD",
            //   amount: payment || 0,
            // },
          }
          // paymentStatus,
        });

        if(billing){
          await Cart.deleteOne({_id:cartData.cartId})
          res.status(200).send({
            success: true,
            order,
            message: "paid bill success",
          });
        }else{
        await Cart.updateOne({ _id: cartData._id },{
          $set:{
            is_place_order:true
          }
        });
        res.status(200).send({
          success: true,
          order,
          message: "order success",
        });
      }
    }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  exports.updateOrderStatus = async(req,res)=>{
    try {
      const { orderId, cartId } = req.body
      await Orders.updateOne({_id:orderId},{
        $set:{
          orderStatus:"Delivered"
        }
      })
      await Cart.deleteOne({ _id: cartId });
        res.status(200).send({
          success: true,
          message: "order deliverd",
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  exports.getEditOrder = async(req,res)=>{
    try {
      const { cartId } =req.body
      const cart = await Cart.findOne({is_place_order:false})
      if(cart){
        if(cart.items.length > 0){
          res.status(400).send({success:false, message:"Please clear the cart"})
        }else{
          const removeCart = await Cart.deleteOne({is_place_order:false})
          if(removeCart){
            const orderCart = await Orders.findOne({cartId:cartId})
            await Cart.updateOne({_Id:cartId}, {
              $set:{
                is_place_order:false,
                odrderId:orderCart._id
              }
            })
            res.status(200).send({success:true, orderCart, message:"edit cart"})
          }
        }
      }else{
        const orderCart = await Orders.findOne({cartId:cartId})
        await Cart.updateOne({_id:cartId}, {
          $set:{
            is_place_order:false,
            odrderId:orderCart._id
          }
        })
        res.status(200).send({success:true, orderCart, message:"edit cart"})
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  exports.editOrder = async (req, res) => {
    try {
      const { payment, addressIndex, cartData } = req.body;
      const customer = await Customer.findOne({ _id: cartData.customer });
      // const address = customer.address[addressIndex];
      const cart = await Cart.findOne({ _id: cartData._id })
        .populate("items.itemId");
        const items = cart.items.map((item) => ({
        product: item.itemId,
        quantity: item.quantity,
        price: item.price,
        addOnitem: item.addOnitem,
        preparationNote:item.preparationNote
      }));

        const order = await Orders.create({
          cartId:cart._id,
          billNumber:cart.billNumber,
          customerId: customer._id,
          employeeId: cart.employeeId,
          item: items,
          totalPrice: cart.total,
          discount: cart.discount,
          grandTotal: cart.grandTotal,
          orderType:cart.orderType,
          tableNumber:cart.tableNumber,
          tableNumber:cart.tableNumber,
          orderStatus:cart.orderType,
          // address:
          paymentType: {
            cash: {
              method:"CASH",
              amount:payment || 0,},
            card: {
              cardNo: payment || "CARD",
              amount: payment || 0,
            },
          } || "",
          // paymentStatus,
        });
        await Cart.updateOne({ _id: cartData._id },{
          $set:{
            is_place_order:true
          }
        });
        res.status(200).send({
          success: true,
          order,
          message: "order success",
        });
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  exports.getOrders = async (req, res) => {
    try {
      const orders = await Orders.find({})
        .sort({ _id: -1 })
        .populate("item.product");
      if (orders) {
        res.status(200).send({
          success: true,
          orders,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "You don't have any order",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  },

  exports.getRunningOrders = async(req,res)=>{
    try {
      const orders = await Orders.find({ paymentStatus: { $ne: "Paid" }})
        .sort({ _id: -1 })
        .populate("item.product");
      if (orders) {
        res.status(200).send({
          success: true,
          orders,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "You don't have any order",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  exports.getOrderItems = async (req, res) => {
    try {
      const { id } = req.query;
      const orderItems = await Orders.findOne({ _id: id })
        .sort({ _id: -1 })
        .populate("item.product").populate("employeeId")
      res.status(200).send({
        success: true,
        orderItems,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Server error.",
      });
    }
  }

  exports.orderCancel = async(req,res)=>{
    try {
      const { orderId } = req.body
      const order = await Orders.findOne({_id:orderId})
      if(order.paymentStatus === "Paid"){
        await Orders.updateOne({_id:orderId},{
          $set:{
            paymentStatus:"Refund",
            refund:order.grandTotal,
          }
        })
        res.status(200).send({
          success: true,
          message:"Orde cncelled and Refunded",
        });
      }else{
        await Orders.deleteOne({_id:orderId})
        res.status(200).send({
          success: true,
          message:"Orde cncelled",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Server error.",
      });
    }
  }