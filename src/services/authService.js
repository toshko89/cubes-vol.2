const User = require('../models/User.js');
const bcrypt = require('bcrypt');

async function registerUser(username, password) {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({username, password:hash});
    return user;
}

const authService = {
    registerUser,

}

module.exports = authService;
