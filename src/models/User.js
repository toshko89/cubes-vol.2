const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:5,
    },

    password:{
        type:String,
        required:true,
        minlength:4,
        maxlength:10
    }

})

const User = mongoose.model('User',userSchema);

module.exports = User;