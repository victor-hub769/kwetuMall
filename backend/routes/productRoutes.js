import express from "express";
import multer from "multer";
import fs from "fs";
import productModel from "../models/productModel.js";

const router = express.Router();

const upload = multer({ dest: "uploads" });
const uploadProductImages = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxcount: 4 },
]);

router.post("/products/create", uploadProductImages, async (req, res) => {
  try {
    console.log(req.files);
    // renaming single image
    let image = req.files.image[0];
    let extension = image.mimetype.split("/")[1];
    let imageNewFileName = image.filename + "." + extension;
    fs.rename(
      `./uploads/${image.filename}`,
      `./uploads/${imageNewFileName}`,
      () => console.log("renamed image succesfully")
    );

    // renaming multiple images.

    let images = req.files.images;
    let renamedImages = images.map((img) => {
      let imgExtension = image.mimetype.split("/")[1];
      let imgNewFileName = img.filename + "." + imgExtension;
      fs.rename(
        `./uploads/${img.filename}`,
        `./uploads/${imgNewFileName}`,
        () => {
          console.log("Renamed images successfullly");
        }
      );
      return imgNewFileName;
    });
    const product = new productModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      buyingPrice: req.body.buyingPrice,
      stock: req.body.stock,
      images: renamedImages,
      category: req.body.category,
      image: imageNewFileName,
    });

    const newProduct = await product.save();

    res.send({
      message: "Product created succesfully",
      data: newProduct,
    });
  } catch (error) {
    res.send({
      message: "Error Occured",
      data: error.message,
    });
  }
});

router.get("/products", async (req, res) => {
  // getting all the products
  try {
    const response = await productModel.find();
    res.send({
      message: "Product found succesfully",
      data: response,
    });
  } catch (error) {
    res.send({
      message: "Error Occured",
      data: error.message,
    });
  }
});

router.get("/products/getone/:id", async (req, res) => {
  try {
    const response = await productModel.findOne({ _id: req.params.id });
    res.send({
      message: "Product found succesfully",
      data: response,
    });
  } catch (error) {
    res.send({
      message: "Error Occured",
      data: error.message,
    });
  }
});

router.post("/products/delete/:id", async (req, res) => {
  try {
    const product = await productModel.findOne({ _id: req.params.id });
    // deleting one image
    fs.unlink("./uploads" + product.image, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("file deleted");
      }
    });

    // delete multiple images

    product.images.map((img) => {
      fs.unlink("./uploads/" + img, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("files deleted");
        }
      });
    });
    await productModel.deleteOne({ _id: req.params.id });
    res.send({
      message: "Deleted product successfully",
    });
  } catch (error) {
    res.send({
      message: "Error Occured",
      data: error.message,
    });
  }
});

router.post("/products/update/:id", async (req, res) => {
  try {
    const product = await productModel.findOne({ _id: req.params.id });
    console.log(product)
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.buyingPrice = req.body.buyingPrice;
    product.category = req.body.category;
    product.stock = req.body.stock;
    const newProduct = await product.save();
    res.send({
      message: "Product updated successfully",
      data: newProduct,
    });
  } catch (error) {
    res.send({
      message: "Error Occurred",
      data: error.message,
    });
  }
});

export default router;
