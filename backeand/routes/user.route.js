const express = require('express')
const router = express.Router()
const {userreg,userlogin} = require('../controller/user.controller')
const {body} = require('express-validator')
const fs = require('fs');
const path = require('path');
const {streamVideo} =require("../controller/stream.controller")
router.post('/userreg',[
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('name').isLength({min:3}).withMessage('Name must be at least 3 characters long')
],userreg)
router.post('/userlogin',[
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],userlogin)
router.get('/list/:department',(req,res)=>{
    const dir=path.join(process.cwd(),'uploads',req.params.department,'videos')
    if (!fs.existsSync(dir)) {
        return res.status(200).json({message:'Directory not found', files: []});
    }
    fs.readdir(dir,(err,files)=>{
        if(err){
            return res.status(400).json({error:err.message});
        }
        res.status(200).json({message:'Files listed successfully',files});
    })
})
router.post('/userlogout',(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({message:'User logged out successfully'});
})
router.get('/list/resources/:department',(req,res)=>{
    const dir=path.join(process.cwd(),'uploads',req.params.department,'resources')
    if (!fs.existsSync(dir)) {
        return res.status(200).json({message:'Directory not found', files: []});
    }
    fs.readdir(dir,(err,files)=>{
        if(err){
            return res.status(400).json({error:err.message});
        }
        res.status(200).json({message:'Files listed successfully',files});
    })
})
router.post('/delete/:department/:filename',(req,res)=>{
    const filename=req.params.filename
    const department=req.params.department
    const filePath=path.join(process.cwd(),'uploads',department,'videos',filename)
    fs.unlink(filePath,(err)=>{
        if(err){
            return res.status(400).json({error:err.message});
        }
        res.status(200).json({message:'File deleted successfully'});
    })
})
router.post('/delete/:department/resources/:filename',(req,res)=>{
    const filename=req.params.filename
    const department=req.params.department
    const filePath=path.join(process.cwd(),'uploads',department,'resources',filename)
    fs.unlink(filePath,(err)=>{
        if(err){
            return res.status(400).json({error:err.message});
        }
        res.status(200).json({message:'File deleted successfully'});
    })
})
router.get('/stream/:department/videos/:filename', streamVideo);
module.exports = router