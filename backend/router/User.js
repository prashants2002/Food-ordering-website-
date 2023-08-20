const router = require("express").Router();
const User = require("../model/User.js");
const Item=require("../model/Item.js");
const bcrypt = require("bcrypt");

//Register
router.post("/register",async(req,res)=>{
    console.log(req.body)
    try{
        var userFind=await User.findOne({email:req.body.email});
        if(userFind){
            res.status(200).json({message:"Email already exist"})
            return;
        }
        const s=await bcrypt.genSalt(10);
        const hPassword=await bcrypt.hash(req.body.password,s);
        const newUser=await new User({
            name:req.body.name,
            email:req.body.email,
            password:hPassword
        });
        const user=await newUser.save();
        console.log("Success")
        res.status(200).json({message:"Registration Successful",user})
        return;
    }catch(err){
        console.log(err);
        res.status(500).json({message:err});
    }
});

//Login
router.post("/login",async(req,res)=>{
    try{
        const userFind=await User.findOne({email:req.body.email});
        if(userFind){
            const password=await bcrypt.compare(req.body.password,userFind.password);
            if(password){
                res.status(200).json({message:"Login Successful",userFind})
                return;
            }
            res.status(200).json({message:"Invalid credentials"})
            return;
        }
        res.status(200).json({message:"Invalid credentials"})
    }catch(err){
        console.log(err);
        res.status(500).json({message:err});
    }
})

module.exports = router;