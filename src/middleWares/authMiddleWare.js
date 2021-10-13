const authService = require('../services/authService.js');
const { JWT_SECRET } = require('../config/config.json');

exports.auth = function (req, res, next) {
    const token = req.cookies['app_token'];

    if (!token) {
        return next();
    }

    const tokenVerify = authService.verifyToken(token, JWT_SECRET);

    if (!tokenVerify) {
        res.status(401).redirect('/login');
        throw new Error('You are not authorized to view this page, please login/regiter');
    }
    req.user = {
        _id: tokenVerify._id,
        username: tokenVerify.username,
    }

    res.locals.user = {
        _id: tokenVerify._id,
        username: tokenVerify.username,
    }

    next();
}

exports.isAuth = function (req, res, next) {
    if (!req.user) {
        return res.status(401).redirect('/login');
    }
    next();
}

