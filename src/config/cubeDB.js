const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name:String,
    description:{
        type:String,
        validate:{
            valudator: function(v){
               return v.length <= 500
            }
        }
    },
    imageUrl:{
        type:String,
        validate:{
            valudator:function(v){
                return /https?:\/\//i.test();
            }
        }
    }
})
