
const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({

    
    categories:{
        type:array
    },
    size:{
        type:String,
    },
    color:{
        type:String
    },
    price:{
        type:Number,
        required:true
    }


},{timestamps:true})

module.exports = mongoose.model("Product",productSchema)