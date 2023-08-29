import express from "express";
import PickupPointModel from "../models/PickupPointModel.js";

const router = express.Router();
router.post("/pickUpPoint/create", async (req, res) => {
  try {
    const newPickUpPoint = new PickupPointModel({
        location:req.body.location,
      name: req.body.name,
    });
    const response = await newPickUpPoint.save();
    res.send({
      message: "PickUpPoint Created Succesfully",
      data: response,
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/pickUpPoint/get", async (req, res) => {
  try {
    const response = await PickupPointModel.find();
    res.send({
      message: "PickUpPoint found succesfully",
      data: response,
    });
  } catch (error) {
    res.send({
      message: "Error Occured",
      data: error.message,
    });
  }
});
router.get("/pickUpPoint/getone/:id", async (req, res) => {
  try {
    const response = await PickupPointModel.findOne({ _id: req.params.id });
    res.send({
      message: "Fetched PickUpPoint Successfully",
      data: response,
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/pickUpPoint/update/:id", async (req, res) => {
  try {
    const response = await PickupPointModel.findOne({ _id: req.params.id });
    response.name = req.body.name;
    response.location=req.body.location;
    const newResponse = await response.save();
    res.send({
      message: "Updated PickUpPoint Successfully",
      data: newResponse,
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/PickUpPoint/delete/:id", async (req, res) => {
  PickupPointModel
    .deleteOne({ _id: req.params.id })
    .then(() => res.send({ message: "Deleted succesfully" }))
    .catch((err) => res.send(err.message));
});

export default router;
