const mongoose = require('mongoose');
const fileschema=new mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    fileuploadedby:{
        type:String,
        required:true
    }
})
const Files = mongoose.model('Files', fileschema);
module.exports=Files;