import {model, Schema} from 'mongoose';

const exerciseSchema = new Schema({

    firstname:{
        type :String,
        required: true
    },
    lastname:{
        type :String,
        required: true
    },
    grade:{
        type: Number,
        required: true,
    }
})
export default model("exerciseModel", exerciseSchema)