const Cart = require("../model/cart.js");
const Customer = require("../model/cumstomer.js");
const Item = require("../model/item");

let billNumberCounter = 0;
exports.selectOrderType = async (req, res) => {
  try {
    const { orderType, tableNumber, name, phone } = req.body;
    const cart = await Cart.find({is_place_order:false}); 
    if (cart.length > 0) {
      res
        .status(200)
        .send({
          success: true,
          message:
            "After changing order type the cart items get removed, please add items again.",
        });
    } else {
      billNumberCounter++;
      const newCustomer = await Customer.create({
        name:name || '',
        phone:phone|| '',
      });
      const formattedBillNumber = `Tbl ${billNumberCounter.toString().padStart(4, '0')}`;
      const newCart = await Cart.create({
        orderType,
        tableNumber,
        customer:newCustomer._id,
        billNumber:formattedBillNumber
      });
     
      res
        .status(200)
        .send({
          success: true,
          newCart,
          newCustomer,
          message: "order type created success",
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.addToCart = async (req, res) => {
  const { itemId, customerId, preparationNote, orderType, name,phone } = req.body;
  try {
    const item = await Item.findOne({ _id: itemId }).populate("addOnitem") 
    const cart = await Cart.findOne({is_place_order:false});
    if (cart) {
      if (cart.items) {
        const proExist = cart.items.findIndex((item) => item.itemId == itemId);
        if (proExist !== -1) {
            res.status(200).send({
            success: true,
            item,
            cartId:cart._id,
            message: "Item All ready in the cart",
          });
        } else {
          const addOn = await Item.findOne({
            _id: itemId,
            addOnitem: { $exists: true },
          }).populate("addOnitem") 
          if (addOn) {
            res.status(200).send({
              success: false,
              item:addOn,
              cartId:cart._id,
              message: "Add on Item included",
            });
          } else {
            await Cart.updateOne(
              {is_place_order:false},
              {
                $addToSet: {
                  items: {
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
        const addOn = await Item.findOne({
          _id: itemId,
          addOnitem: { $exists: true },
        }).populate("addOnitem") 
        if (addOn) {
          res.status(200).send({
            success:false,
            item:addOn,
            cartId:cart._id,
            message: "Add on Item included",
          });
        } else {
          await Cart.updateOne(
            {is_place_order:false},
            {
              $addToSet: {
                customer: customerId,
                items: {
                  itemId: item._id,
                  price: item.price,
                  preparationNote,
                },
              },
            }
          );
          res.status(200).send({
            success: true,
            message: "product added to cart",
          });
        }
      }
    } else {
      const addOn = await Item.findOne({
        _id: itemId,
        addOnitem: { $exists: true },
      }).populate("addOnitem") 
      if (addOn) {
        res.status(200).send({
          success: true,
          item:addOn,
          message: "Add on Item included",
        });
      } else if(orderType){
        const newCustomer = await Customer.create({
          name:name || '',
          phone:phone|| '', 
        });
        const newCart = await Cart.create({
          customer: newCustomer._id,
          orderType: orderType,
          items: [
            {
              itemId: item._id,
              price: item.price,
              preparationNote,
            },
          ],
        });
        res.status(200).send({
          success: true,
          item,
          newCart,
          message: "product added to cart",
        });
      }else{
        res.status(400).send({
          success:false, message:"please select order status"
        })
        console.log('please select order type');
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const cartId = req.body.cartId;
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res
        .status(404)
        .send({ success: false, message: "Cart not found" });
    }
    const itemId = req.body.itemId;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const preparationNote = req.body.preparationNote;
    const addonItem = req.body.addonItem;

    const existingItem = cart.items.find((item) => item.itemId.equals(itemId));

    if (existingItem) {
      existingItem.quantity = quantity;
      existingItem.price = price;
      existingItem.preparationNote = preparationNote;

      if (addonItem.length > 0) {
        addonItem.forEach((newAddon) => {
          const existingAddon = existingItem.addOnitem.find((addon) =>
            addon.itemId && addon.itemId.equals(newAddon.itemId)
          );
      
          if (existingAddon) {
            existingAddon.quantity = newAddon.quantity;
            existingAddon.price = newAddon.price;
          } else {
            existingItem.addOnitem.push(newAddon);
          }
        });
      }
      
    } else {
      cart.items.push({
        itemId,
        quantity,
        price,
        preparationNote,
        date: Date.now(),
        addOnitem: addonItem ? [addonItem] : [],
      });
    }
    await cart.save();
    res.status(200)
      .send({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

exports.changeQuantity = async (req, res) => {
  try {
    const { itemId, cartId, action } = req.body;
    const product = await Item.findOne({ _id: itemId });
    if (action.increment) {
      await Cart.updateOne(
        { _id: cartId, "items.itemId": itemId },
        {
          $inc: {
            "items.$.quantity": 1,
            "items.$.price": product.price,
          },
        }
      );
    } else if (action.decrement) {
      await Cart.updateOne(
        { _id: cartId, "items.itemId": itemId },
        {
          $inc: {
            "items.$.quantity": -1,
            "items.$.price": -product.price,
          },
        }
      );
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
};

exports.cancelCartItem = async (req, res) => {
  try {
    const { itemId, cartId } = req.body;
    await Cart.updateOne(
      { _id: cartId },
      {
        $pull: {
          items: { itemId: itemId },
        },
      }
    );
    res.status(200).send({
      success: true,
      message: "Item cancelled",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.cartTotal = async (req, res) => {
  try {
    const { cartId, amount, grandTotal } = req.body;
    await Cart.updateOne(
      { _id: cartId },
      {
        $set: {
          total: amount,
          grandTotal,
        },
      }
    );
    res.status(200).send({
      success: true,
      message: "total updated",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "seerver error",
    });
  }
}

  exports.getcart = async (req, res) => {
    try {
      const cartId = req.query.id;
      const cartData = await Cart.findOne({is_place_order:false}).populate(
        "items.itemId"
      );
      if (cartData) {
        res.status(200).send({
          success: true,
          cartData,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "Cart is empty",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Server error",
      });
    }
  }
