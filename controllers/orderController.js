const Cart = require("../model/cart");
const Customer = require("../model/customer");
const Orders = require("../model/order");

let newOrder;
  
  exports.order = async (req, res) => {
    try {
      const { payment, addressIndex, cartData } = req.body;
      console.log(cartData);
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

        const oreder = await Orders.create({
          customerId: customer._id,
          restaurantId: cart.restaurantId,
          item: items,
          totalPrice: cart.total,
          discount: cart.discount,
          grandTotal: cart.grandTotal,
          orderType:cart.orderType,
          tableNumber:cart.tableNumber,
          // address,
          paymentType: {
            cash: {
              method:"CASH",
              amount:payment.cash || 0,},
            card: {
              cardNo: payment.card.cardNo || "CARD",
              amount: payment.card.amount || 0,
            },
          },
          paymentStatus,
        });
        // await Cart.deleteOne({ _id: cartData._id });
        res.status(200).send({
          success: true,
          oreder,
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

  exports.updateOrderStatus = async(req,res)=>{
    try {
      const { orderId, cartId } = req.body
      await Orders.updateOne({_id:orderId},{
        $set:{
          is_delivered:true
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

  exports.editOrder = async(req,res)=>{
    try {
      
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
      const id = req.query.id;
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

  // cancelOrder: async (req, res) => {
  //   try {
  //     const { itemId, orderId, userId } = req.body;
  //     const orderItem = await Orders.findOne({ "item._id": itemId });
  //     const orderStatus = orderItem.item.map((ele) => {
  //       return { orderStatus: ele.orderStatus, price: ele.price };
  //     });
  //     console.log("order ====> ", orderStatus);
  //     if (orderStatus[0].orderStatus !== "Delivered") {
  //       await Orders.updateOne(
  //         { _id: orderId },
  //         {
  //           $pull: {
  //             item: { _id: itemId },
  //           },
  //         }
  //       );
  //       res.status(200).send({
  //         success: true,
  //         message: "Item cancelled",
  //       });
  //       if (orderItem.paymentType !== "COD") {
  //         const price = parseFloat(orderStatus[0].price).toFixed(2);
  //         await Users.updateOne(
  //           { _id: userId },
  //           {
  //             $inc: {
  //               Wallet: price,
  //             },
  //           }
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     res.status(500).send({
  //       success: false,
  //       message: "Internal server error",
  //     });
  //   }
  // },

//  exports.cancelOrder = async (req, res) => {
//     try {
//       const { itemId, orderId, userId } = req.body;
//       const orderItem = await Orders.findOne({ "item._id": itemId });
  
//       if (orderItem) {
//         const canceledItemIndex = orderItem.item.findIndex(item => item._id.toString() === itemId);
  
//         if (canceledItemIndex !== -1 && orderItem.item[canceledItemIndex].orderStatus !== "Delivered") {
//           const canceledItem = orderItem.item[canceledItemIndex];
//           const canceledProductPrice = canceledItem.price * canceledItem.quantity;
//           const canceledProductDiscount = canceledProductPrice * (canceledItem.discount || 0);
//           const updatedTotalPrice = orderItem.totalPrice - canceledProductPrice;
//           const updatedDiscount = orderItem.discount - canceledProductDiscount;
//           const updatedGrandTotal = updatedTotalPrice - updatedDiscount;
          
//           // Update order details to cancel the item and remove restaurantId
//           if(req.baseUrl.startsWith('/restaurant')){
//             await Orders.updateOne(
//               { _id: orderId },
//               {
//                 $set: {
//                   "item.$[element].is_canceled": true,
//                   totalPrice: updatedTotalPrice,
//                   discount: updatedDiscount,
//                   grandTotal: updatedGrandTotal,
//                 },
//               },
//               {
//                 arrayFilters: [{ "element._id": itemId }], 
//               }
//             );
//           }else{
//             await Orders.updateOne(
//               { _id: orderId },
//               {
//                 $pull: { item: { _id: itemId }, },
//                 $set: {
//                   totalPrice: updatedTotalPrice,
//                   discount: updatedDiscount,
//                   grandTotal: updatedGrandTotal
//                 },
//               }
//             );
//           }
//           res.status(200).send({
//             success: true,
//             message: "Item cancelled",
//           });
  
//           if (orderItem.paymentType !== "COD") {
//             const formattedPrice = parseFloat(canceledProductPrice).toFixed(2);
//             await Users.updateOne(
//               { _id: userId },
//               {
//                 $inc: { Wallet: parseFloat(formattedPrice) }
//               }
//             );
//           }
//         } else {
//           res.status(400).send({
//             success: false,
//             message: "Item not found or cannot be cancelled.",
//           });
//         }
//       } else {
//         res.status(400).send({
//           success: false,
//           message: "Order not found.",
//         });
//       }
//     } catch (error) {
//       console.error("Error cancelling item:", error);
//       res.status(500).send({
//         success: false,
//         message: "Internal server error",
//       });
//     }
//   },


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