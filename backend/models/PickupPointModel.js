import {model, Schema} from 'mongoose';

const pickUpPointSchema = new Schema({
    location:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    }
});

export default model("pickUpPointModel",pickUpPointSchema )