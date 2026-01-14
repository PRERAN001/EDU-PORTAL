const User = require('../models/user.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
module.exports.userreg=async(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {email,password,name}=req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({error:'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email,password:hashedPassword,name});
        await newUser.save();
        const token = await newUser.generateAuthToken();
        res.cookie('token',token,{
            
        })
        res.status(201).json({message:'User registered successfully'});
}
module.exports.userlogin=async(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:'User does not exist'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({error:'Invalid credentials'});
        }
        const token = await user.generateAuthToken();
        res.cookie('token',token,{
            
        })
        res.status(200).json({message:'User logged in successfully',"token":token });
}