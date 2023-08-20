const router = require("express").Router();
const Restraunt = require("../model/Restraunt.js");
const bcrypt = require("bcrypt");

//Register
//Check for password and cpassword on frontend side
//Check for password length on frontend side
router.post("/register",async(req,res)=>{
    try{
        var restrauntFind=await Restraunt.findOne({email:req.body.email});
        if(restrauntFind){
            res.status(200).json("Email already exist")
            return;
        }
        const s=await bcrypt.genSalt(10);
        const hPassword=await bcrypt.hash(req.body.password,s);
        const newRestraunt=await new Restraunt({
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact,
            password:hPassword
        });
        const restraunt=await newRestraunt.save();
        res.status(200).json({message:"Registration Successful",restraunt})
        return;
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//Login
router.post("/login",async(req,res)=>{
    //console.log(req.body)
    try{
        const restrauntFind=await Restraunt.findOne({email:req.body.email});
        if(restrauntFind){
            const password=await bcrypt.compare(req.body.password,restrauntFind.password);
            if(password){
                res.status(200).json({message:"Login Successful",restrauntFind})
                return;
            }
            res.status(200).json({message:"Invalid credentials"})
            return;
        }
        res.status(200).json({message:"Invalid credentials"})
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

//Add Details
router.put("/:id",async(req,res)=>{
    if(req.body._id===req.params.id){
        try{const restrauntFind=await Restraunt.findById(req.params.id);
            if(restrauntFind){
                const restraunt=await Restraunt.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                })
                res.status(200).json("Acount Updated")
            }
            else{
                res.status(200).json("Account Not Found")
            }
        }catch(err){
            res.status(500).json("Error")
        }
    }
    else{
        return res.status(403).json({message:"You can update only your account"})
    }
})


//Get Restraunts
router.get("/",async(req,res)=>{
    try{
        const restraunt=await Restraunt.find();
        res.status(200).json(restraunt);
    }catch(err){
        res.status(500).json(err);
    }
})

//Get a Single Restraunt
router.get("/:id",async(req,res)=>{
    try{
        const restraunt=await Restraunt.findById(req.params.id);
        res.status(200).json(restraunt);
    }catch(err){
        res.status(500).json(err);
    }
})

//Add Offer
router.put("/:id/offer",async(req,res)=>{
    try{
        const restraunt=await Restraunt.findByIdAndUpdate(req.params.id,{
            $push:{offers:req.body.offer}
        })
        res.status(200).json("Offer added")
    }catch(err){
        console.log(err);
        res.status(500).json("Error");
    }
})


module.exports = router;