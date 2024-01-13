const Cart = require("../model/cart.js");
const Item = require("../model/item");


// module.exports cart = {
  exports.addToCart = async (req, res) => {
    const { itemId, customerId, preparationNote} = req.body;
    try {
      const item = await Item.findOne({ _id: itemId }); 

      const cart = await Cart.find();
      if (cart.length > 0) {
        const proExist = cart.items.findIndex(
            (item) => item.itemId == itemId
          );
        if (proExist !== -1) {
            res.status(200).send({
                    success: true,
                    item,
                    message: "Item All ready in the cart",
                  });
        }else{
            const addOn = await Item.findOne({ _id: itemId, addOnitem: { $exists: true } })
            if(addOn){
                res.status(200).send({
                    success: true,
                    addOn,
                    message: "AddOn in the Item",
                  });
            }else{
                await Cart.updateOne(
                    {},
                    {
                      $addToSet: {
                        "items": {
                          itemId: item._id,
                          price: item.price,
                          preparationNote, 
                        },
                      },
                    }
                  );
                  
              res.status(200).send({
                success: true,
                item,
                message: "product added to cart",
              });
        }
    }
      } else {
        const addOn = await Item.findOne({ _id: itemId, addOnitem: { $exists: true } })
        if(addOn){
            res.status(200).send({
                success: true,
                addOn,
                message:"Add on Item included"
              });
        }
          await Cart.create({
            customer: customerId,
          items: [
            {
              itemId: item._id,
              price: item.price,
              preparationNote,
            },
          ],
        })
            res.status(200).send({
                success:true,
                message:"product added to cart"
            })
        
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Internal server error", 
      });
    }
  }

  exports.updateCart = async(req,res)=>{
    try {
        const { quantity, price, cartId, addOns, itemId } = req.body
        await Cart.updateOne({},{
            itemId: itemId,
            price: price,
            quantity:quantity,
            preparationNote,
        })
        res.status(200).send({
            success:true,
            message:"product added to cart"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
        success: false,
        message: "Internal server error", 
      });
    }
  }
  exports.changeQuantity = async(req,res)=>{
    try {
      const {itemId, cartId, action, variant} = req.body
      const product = await Item.findOne({ _id: itemId });
      const vrIndx = product.variants.findIndex(
        (item) => item.name == variant
      );
      if(action.increment){
        await Cart.updateOne({_id:cartId, "items.productId":itemId, "items.variant":variant},{
          $inc: {
            "items.$.quantity": 1,
            "items.$.price": product.variants[vrIndx].offerPrice,
          },
        })
      }else if(action.decrement){
        await Cart.updateOne({_id:cartId, "items.productId":itemId, "items.variant":variant},{
          $inc: {
            "items.$.quantity": -1,
            "items.$.price": -product.variants[vrIndx].offerPrice,
          },
        })
      }
      res.status(200).send({
        success: true,
        message: "quantityChanged",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
  }

  exports.cancelCartItem = async(req,res)=>{
    try {
      const {itemId, cartId} = req.body
      await Cart.updateOne({_id:cartId},{
        $pull:{
           items: { itemId: itemId }
        }
      })
      res.status(200).send({
        success:true,
        message:"Item cancelled"
      })
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
  }

  exports.cartTotal = async(req,res)=>{
    try {
      const { cartId, amount, grandTotal } = req.body
      await Cart.updateOne({_id:cartId},{
        $set:{
          total:amount,
          grandTotal,
        }
      })
      res.status(200).send({
        success:true,
        message:"total updated"
      })
    } catch (error) {
      res.status(500).send({
        success:false,
        message:"seerver error"
      })
    }
  },

  exports.getcart = async(req,res)=>{
    try {
      const userId  = req.query.id
      const cartData = await Cart.findOne({user:userId}).populate('items.productId')
      if(cartData){
        res.status(200).send({
          success:true,
          cartData
        })
      }else{
        res.status(200).send({
          success:false,
          message:"Your Cart is empty"
        })
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success:false,
        message:"Server error"
      })
    }
  }
// };
