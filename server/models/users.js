

var mongoose =require('mongoose');


var user =mongoose.model('User',{
    email:{
        type:String,
        trim:true,
        required:true,
        minlength:5

    }
})
module.exports={user};