const mongoose=require('mongoose')
const bcrypt = require('bcrypt');
const jsonwebtoken = require("jsonwebtoken");
const admin=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
})

admin.methods.generateAuthToken = async function () {
    const token = jsonwebtoken.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}


const Admin = mongoose.model('Admin01', admin);
module.exports=Admin;