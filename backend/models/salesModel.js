import {model, Schema} from 'mongoose';

const salesSchema = new Schema({
    productId:{
        type:String,
        required:true
    },
    userId:{


        
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
});

export default model("salesModel", salesSchema)