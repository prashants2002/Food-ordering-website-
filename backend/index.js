const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cors=require("cors");

const userRoute=require("./router/User.js");
const restrauntRoute=require("./router/Restraunt.js");
const itemRoute=require("./router/Item.js");
const cartRoute=require("./router/Cart.js");
const orderRoute=require("./router/Order.js");

const app=express();
app.use(express.json());
app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log("MongoDB connected")
})

app.use("/server/user",userRoute);
app.use("/server/restraunt",restrauntRoute);
app.use("/server/item",itemRoute);
app.use("/server/cart",cartRoute);
app.use("/server/order",orderRoute);

app.listen(5000,()=>{
    console.log("Server running on PORT 5000")
})