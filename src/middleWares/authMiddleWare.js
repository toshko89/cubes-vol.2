const authService = require("../services/authService.js");

exports.auth = function (req,res,next){
    const token = res.cookies;
    console.log(req);
    next();
}

