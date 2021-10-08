const mongoose = require('mongoose');
const Accesory = require('./Accessory.js');


const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.length <= 500
            }
        }
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\//i.test(v);
            }
        }
    },
    difficulty: {
        type: Number,
        required: true,
        validate: {
            validator: function (num) {
                return num >= 1 && num <= 6;
            }
        }
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory'
        }
    ],
    user: [
        {
            type:mongoose.Types.ObjectId,
            ref:'User'
        }
    ]
});

const Cubes = mongoose.model('Cubes', cubeSchema);

module.exports = Cubes;
