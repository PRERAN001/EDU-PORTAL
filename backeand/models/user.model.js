const mongoose=require('mongoose')
const jsonwebtoken=require('jsonwebtoken')
const user=new mongoose.Schema({
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
user.methods.generateAuthToken = async function () {
    const token = jsonwebtoken.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}

const User = mongoose.model('User01', user);
module.exports=User;
