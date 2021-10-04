const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true,
        validate:{
            validator:function(v){
                return /https?:\/\//i.test(v);
            }
        }
    },
    description:{
        type:String,
        required:true,
        validate:{
            validator: function(v){
               return v.length <= 500
            }
        }
    }
})

const Accesory = mongoose.model('Accessory',accessorySchema);

module.exports = Accesory;