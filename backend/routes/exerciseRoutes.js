import express, { response } from "express";
import exerciseModel from "../models/exerciseModel.js";
import { get } from "mongoose";

const router = express.Router();

router.post("/student/create", async (req, res) => {
  try {
    const newStudent = new exerciseModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      grade: req.body.grade,
    });

    newStudent;
    const response = await newStudent.save();
    res.send(response);
  } catch (error) {
    res.send(err.message);
  }
  // .then((response) => {
  //   res.send(response);
  // })
  // .catch((err) => {
  //   res.send(err.message);
  // });
});

router.get("/student/get", async (req, res) => {
  try {
    const response = await exerciseModel.find();
    res.send(response)
  } catch (error) {
    res.send(err.message);
  }

  // .then((response) => {
  //   res.send(response);
  // })
  // .catch((err) => {
  //   res.send(err.message);
  // });
});

router.get("/student/getone/:id", async (req, res) => {
  try {
    const response = await exerciseModel.findOne({ _id: req.params.id });
    res.send(response)
  } catch (error) {
    res.send(err.message);
  }
  // .then((response) => {
  //   res.send(response);
  // })
  // .catch((err) => {
  //   res.send(err.message);
  // });
});

router.post("/student/update/:id", async (req, res) => {
  try {
    const student = await exerciseModel.findOne({ _id: req.params.id });
    student.firstname = req.body.firstname;
    student.lastname = req.body.lastname;
    student.grade = req.body.grade;
    const newStudent = await student.save();
    res.send(newStudent);
  } catch (error) {
    res.send(err.message);
  }
});

router.post("/student/delete/:id", async (req, res) => {
 try {
    await exerciseModel.deleteOne({ _id: req.params.id })
    res.send('Deleted succsfully')
    
 } catch (error) {
    res.send(err.message)
 }
    // .then(() => res.send("Deleted succesfully"))
    // .catch((err) => res.send(err.message));
});



// Activity
// create a model called studentMarksModel
// The modle will have the fields, studentId, mathematics, english, swahili,physics,geography
// create a file called markRoutes under routes folder
// add requests that create , read and update the data in studentMarksModel

export default router;


get 
post 





