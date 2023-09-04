import express from "express";
import { checkUserAuth } from "./CheckAuth.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

const router = express.Router();

router.post("/add-to-cart", checkUserAuth, async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id });
    user.cart = [
      ...user.cart,
      {
        quantity: req.body.quantity,
        productId: req.body.productId,
      },
    ];
    const newUser = await user.save();
    res.send({
      message: "Added to cart sucessfully!",
      data: newUser,
    });
  } catch (error) {
    res.send({
      message: "Error ccurred",
      data: error.message,
    });
  }
});
router.get("/get-cart-items", checkUserAuth, async (req, res) => {
  try {
    const cart = req.user.cart;
    let products = [];

    for (let i = 0; i < cart.length; i++) {
      console.log(cart[i].productId);
      let product = await productModel.findOne({ _id: cart[i].productId });
      console.log(product);
      products = [
        ...products,
        { product: product, quantity: cart[i].quantity },
      ];
    }
    res.send({
      message: "Fetched cart Properly",
      data: products,
      cart: cart,
    });
  } catch (error) {
    res.send({
      message: "Error occurred",
      data: error.message,
    });
  }
});

export default router;
