const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//Register
router.post("/register",async(req,res)=>{
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        //password: req.body.password,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.PASS_HASH).toString()
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err);

    }

    
});


//login
router.post("/login", async(req,res)=>{

    try{
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("wrong credentials")
    
    
        const hashPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_HASH
        );
        const password = hashPassword.toString(CryptoJS.enc.Utf8);
            
        password !== req.body.password &&
            res.status(401).json("wrong credential");

            res.status(200).json("sucessfull");
    
    }catch(err){
        res.status(500).json(err);
    }
   
});




module.exports = router ;