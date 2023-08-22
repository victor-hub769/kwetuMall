import express from "express";
import categoryModel from "../models/categoryModel.js";

const router = express.Router();
router.post("/category/create", async (req, res) => {
  try {
    const newCategory = new categoryModel({
      name: req.body.name,
    });
    const response = await newCategory.save();
    res.send({
      message: "Category Created Succesfully",
      data: response,
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/category/get", async (req, res) => {
  try {
    const response = await categoryModel.find();
    res.send({
      message: "Category found succesfully",
      data: response,
    });
  } catch (error) {
    res.send({
      message: "Error Occured",
      data: error.message,
    });
  }
});
router.get("/category/getone/:id", async (req, res) => {
  try {
    const response = await categoryModel.findOne({ _id: req.params.id });
    res.send({
      message: "Fetched Category Successfully",
      data: response,
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/category/update/:id", async (req, res) => {
  try {
    const response = await categoryModel.findOne({ _id: req.params.id });
    response.name = req.body.name;
    const newResponse = await response.save();
    res.send({
      message: "Updated Category Successfully",
      data: newResponse,
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/category/delete/:id", async (req, res) => {
  categoryModel
    .deleteOne({ _id: req.params.id })
    .then(() => res.send({ message: "Deleted succesfully" }))
    .catch((err) => res.send(err.message));
});

export default router;
