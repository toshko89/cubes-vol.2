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
    },

    cubes: [
        {
            type:mongoose.Types.ObjectId,
            ref:'Cubes'
        }
    ]

})

const User = mongoose.model('User',userSchema);

module.exports = User;