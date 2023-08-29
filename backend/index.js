import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import testRoutes from './routes/testRoutes.js';
import studentRoutes  from './routes/studentRoutes.js';
import exerciseRoutes from './routes/exerciseRoutes.js';
import markRoutes from './routes/markRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryModel from "./models/categoryModel.js";
import categoryRoutes from './routes/categoryRoutes.js';
import pickupPointRoutes from "./routes/pickupPointRoutes.js";
import userAuth from './routes/userAuth.js';
import adminAuth from './routes/adminAuth.js';


const app = express();
const PORT = 5000;
app.use(bodyParser.json());
app.use(express.static('uploads'))

 






app.use(cors());
app.use('/',userAuth);
app.use('/', adminAuth);
app.use('/', testRoutes);
app.use('/', studentRoutes);
app.use('/', exerciseRoutes);
app.use('/', markRoutes);
app.use('/', productRoutes);
app.use('/', categoryRoutes);
app.use('/', pickupPointRoutes);

  
// evQifMwKvDbapMli
// mongodb+srv://victormuriithi996:<password>@cluster0.opozqee.mongodb.net/?retryWrites=true&w=majority

const mongoURL = 'mongodb+srv://victormuriithi996:'+ encodeURIComponent ('evQifMwKvDbapMli')+ '@cluster0.opozqee.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURL)
         .then(()=> console.log('Connected to mongodb'))
         .catch((err)=> console.log(err));

app.listen(PORT, () => {
  console.log("server listening on PORT: " + PORT);
});
// Activity
// create a route with the path /students
// the route will send a response of an array of objects which contains 5 students with their names and grades


