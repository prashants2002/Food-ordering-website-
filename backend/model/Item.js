const mongoose=require("mongoose");

const ItemSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    restraunt:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restraunt",
    },
    description:{
        type:String,
    },
    veg:{
        type:Boolean,
        default:true
    },
    price:{
        type:Number,
    },
    image:{
        type:String
    }
},{timestamps:true});

module.exports=mongoose.model("Item",ItemSchema);