import {model, Schema} from 'mongoose';

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    buyingPrice:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    images:{
        type:[String],
        required:true
    },
    category:{
        type:[String],
        required:true
    },
        image:{
        type: String,
        required:true
}});

export default model("productModel", productSchema)