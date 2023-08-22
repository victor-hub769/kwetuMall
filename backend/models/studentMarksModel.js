import { model, Schema } from "mongoose";

const studentMarksSchema = new Schema({
  studentId: {
    type: String,
    required: true,
  },
  mathematics: {
    type: Number,
    required: true,
  },
  english: {
    type: Number,
    required: true,
  },
  swahili: {
    type: Number,
    required: true,
  },
  physics: {
    type: Number,
    required: true,
  },
  geography: {
    type: Number,
    required: true,
  },
});
export default model("studentMarksModel" , studentMarksSchema)
// studentId, mathematics, english, swahili,physics,geography
