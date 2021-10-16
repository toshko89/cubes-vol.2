const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [6,'User name must be at least 6 characters long'],
        unique:true
    },

    password: {
        type: String,
        required: true,
        minlength: [6, 'Your password should be at least 6 characters'],
    },
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

userSchema.static('checkUsername', function (username) {
    return this.findOne({ username }).lean();
});

const User = mongoose.model('User', userSchema);

module.exports = User;