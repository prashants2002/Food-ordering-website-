const router = require("express").Router();
const Restraunt = require("../model/Restraunt.js");
const Item = require("../model/Item.js");
const User = require("../model/User.js");
const Cart = require("../model/Cart.js");

//Add Item
router.post("/:id", async (req, res) => {
    console.log(req.body);
    try {
        const newCart = await new Cart(req.body);
        const cart = await newCart.save();
        console.log("Success")
        res.status(200).json({ message: "Item Added", cart })
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Increase Descrese Quantity
router.put("/:id", async (req, res) => {
    try {
        if(req.body.quantity===0){
            const cartItem=await Cart.findOneAndDelete({ "user": req.params.id, "item": req.body.item });
            res.status(200).json({message:"Item removed from cart"});
        }
        else{
            const cartItem = await Cart.findOneAndUpdate({ "user": req.params.id, "item": req.body.item }, {
                $set: { quantity: req.body.quantity}
            });
            res.status(200).json({ message: "Quantity Changed" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error" })
    }
})


//Get Cart total
router.get("/:id/total",async(req,res)=>{
    try{
        var total=0;
        var discount=0;
        var delivery=0;
        const cart=await Cart.find({"user":req.params.id});
        var l=cart.length;
        var resArray=[];
        for(i=0;i<l;i++){
            const item=await Item.findById(cart[i].item);
            var singleItem=0;
            var tax=0;
            var price=cart[i].quantity*item.price;
            singleItem=(singleItem+price);
            tax=singleItem*0.05;
            total=total+price;
            const restraunt =await Restraunt.findById(cart[i].restraunt);
            singleItem=singleItem-(singleItem*0.01*(restraunt.offer));
            var discount=discount+price*0.01*(restraunt.offer);
            if(!resArray.includes(cart[i].restraunt.toString())){
                delivery=delivery+restraunt.delivery;
                resArray.push(cart[i].restraunt.toString());
            }
            const cartItem = await Cart.findOneAndUpdate({ "user": req.params.id, "item": cart[i].item }, {
                $set: { price: singleItem+tax}
            });
        }
        const cartTotal={
            total:total,
            discount:parseInt(discount),
            delivery:delivery
        }
        res.status(200).json(cartTotal);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error"})
    }
})


//Get Cart Item
router.get("/:id/cart", async (req, res) => {
    try{
        const cart = await Cart.find({ "user": req.params.id });
        var l=cart.length;
        var itemArray=[];
        for(i=0;i<l;i++){
            try{
                const item=await Item.findById(cart[i].item);
                const itemObj={
                    name:item.name,
                    price:item.price,
                    quantity:cart[i].quantity,
                    veg:item.veg,
                    id:cart[i].item,
                    image:item.image,
                    restraunt:item.restraunt,
                }
                itemArray.push(itemObj);
                
            }catch(err){
                console.log(err);
                res.status(500).json(err);
            }
        }
        res.status(200).json(itemArray);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error"});
    }
})

//Check if item is in cart
router.get("/:user/:id",async(req,res)=>{
    const cart = await Cart.find({ "user": req.params.user,"item":req.params.id });
    if(cart.length){
        res.status(200).json(cart[0].quantity);
    }
    else{
        res.status(200).json(false);
    }
})


module.exports = router;