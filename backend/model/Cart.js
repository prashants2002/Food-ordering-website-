const mongoose=require("mongoose");

const CartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:"User",
    },
    restraunt:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restraunt",
    },
    item:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item"
    },
    quantity:{
        type:Number
    },
    price:{
        type:Number
    }
},{timestamps:true});

module.exports=mongoose.model("Cart",CartSchema);