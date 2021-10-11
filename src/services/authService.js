const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const config = require('../config/config.json');

async function registerUser(username, password) {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash });

    const token = createToken(user);
    
}

async function login(username, password) {

}

function createToken(user) {
    const token = jwt.sign({ _id: user._id, username: user.username }, config.JWT_SECRET, { expiresIn: '2d' });
    return token;
}

function verifyToken(token, secretKey){

}

const authService = {
    registerUser,

}

module.exports = authService;
