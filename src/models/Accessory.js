const mongoose = require('mongoose');
const Cubes = require('./Cube.js');

const accesorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true,
        validate:{
            validator:function(v){
                return /https?:\/\//i.test();
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

const Accesory = mongoose.model('Accesory',accesorySchema);

module.exports = Accesory;