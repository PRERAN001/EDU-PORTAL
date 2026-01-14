const express = require('express');
const router = express.Router();
const {body,param,query} = require('express-validator');
const {adminreg,adminlogin,adminlogout,uploadvideo,upload} = require('../controller/admin.controller');
// router.post('/adminreg',[
//     body('email').isEmail().withMessage('Email is not valid'),
//     body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
//     body('name').isLength({min:3}).withMessage('Name must be at least 3 characters long')
// ],adminreg)
router.post('/adminlogin',[
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],adminlogin)
router.post('/adminlogout',adminlogout)
router.post(
  '/upload',
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'resource', maxCount: 5 }
  ]),
  uploadvideo
);

module.exports = router;
