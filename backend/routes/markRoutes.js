import express, { response } from "express";
import studentMarksModel from "../models/studentMarksModel.js";

const router = express.Router();

router.get("/studentMarks/getAll", (req, res)=>{
    console.log("getting here")
    res.send('ok')
})

router.get("/studentMarks/get", (req, res) => {
    studentMarksModel
      .find()
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err.message);
      });
  });

  router.get("/studentMarks/getone/:id", (req, res) => {
    studentMarksModel
      .findOne({ _id: req.params.id })
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err.message);
      });
  });

router.post("/studentMarks/create", (req, res) => {
  const newStudentMarks = new studentMarksModel({
    studentId: req.body.studentId,
    mathematics: req.body.mathematics,
    english: req.body.english,
    swahili: req.body.swahili,
    physics: req.body.physics,
    geography: req.body.geography,
  });
  newStudentMarks
    .save()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.post("/studentMarks/update/:id", async (req, res) => {
    const studentMarks = await studentMarksModel.findOne({ _id: req.params.id });
    console.log(studentMarks)
    studentMarks.studentId = req.body.studentId;
    studentMarks.mathematics = req.body.mathematics;
    studentMarks.english = req.body.english;
    studentMarks.swahili = req.body.swahili;
    studentMarks.physics = req.body.physics;
    studentMarks.geography = req.body.geography;
    const newStudentMarks = await studentMarks.save();
    res.send(newStudentMarks);
  }); 

  router.post("/studentMarks/delete/:id", (req, res) => {
    studentMarksModel
      .deleteOne({_id: req.params.id })
      .then(() => res.send("Deleted succesfully"))
      .catch((err) => res.send(err.message));
  });


  

  







  

export default router;

