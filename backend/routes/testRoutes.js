import express from "express";

const router = express.Router();

router.get("/students", (req, res) => {
  let items = [
    { name: "Jeff Doe", grade: "B" },
    { name: "Jeremy Doe", grade: "C" },
    { name: "John Doe", grade: "B" },
    { name: "James Doe", grade: "A" },
    { name: "Jane Doe", grade: "C" },
  ];

  res.send(items);
});

router.get("/average", (req, res) => {
  let subjects = {
    Math:80,
    English:90,
    Science:60,
    Kiswahili:50,
    Socialstudies:80,
  };
  let averageMarks= (subjects.Math +subjects.English +subjects.Science+ subjects.Kiswahili +subjects.Socialstudies)/5
  console.log (averageMarks)
  res.send(averageMarks+'%')  
});

router.post('/student/register',(req,res)=>{
  console.log(req.body);
  res.send(`Welcome ${req.body.firstName} ${req.body.lastName}`)
})

router.post('/student/sum', (req,res)=>{
  console.log(req.body)
  res.send(`The sum is ${(req.body.x + req.body.y)}`)
})

export default router;
