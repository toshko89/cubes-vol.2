const authService = require('../services/authService.js');

const authRouter = require('express').Router();

authRouter.get('/register', (req, res) => {
    res.render('auth-pages/register');
});

authRouter.post('/register', async (req, res) => {
    let { username, password, repeatPassword } = req.body;
    if (username == '' || password == '' || repeatPassword == '') {
        throw new Error('All field are required!');
    }

    if (password !== repeatPassword) {
        throw new Error('Please re-enter your password');
    }

    try {
        await authService.registerUser(username, password);
    } catch (err) {
        console.log(err);
    }
});

authRouter.get('/login', (req, res) => {
    res.render('auth-pages/login');
});

authRouter.post('/login', (req, res) => {

});

authRouter.get('/logout', (req, res) => {

})

module.exports = authRouter;