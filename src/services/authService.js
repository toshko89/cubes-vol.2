const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const config = require('../config/config.json');

async function registerUser(username, password) {
    return User.create({ username, password });
}

async function login(username, password) {
    const user = await User.checkUsername(username);
    
    if(!user){
        throw new Error('Wrong username or password');
    }
    
    const pasword = await bcrypt.compare(password,user.password);

    if(!pasword){
        throw new Error('Wrong username or password');
    }

    return createToken(user);
}

function createToken(user) {
    const token = jwt.sign({ _id: user._id, username: user.username }, config.JWT_SECRET, { expiresIn: '2d' });
    return token;
}

function verifyToken(token, secretKey) {
    return jwt.verify(token,secretKey);
}

const authService =     {
    registerUser,
    createToken,
    verifyToken,
    login,
}

module.exports = authService;
