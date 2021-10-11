const authRouter = require('express').Router();

authRouter.get('/register',(req,res)=>{
    res.render('auth-pages/register');
})

module.exports = authRouter;