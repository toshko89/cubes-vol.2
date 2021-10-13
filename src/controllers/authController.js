const authRouter = require('express').Router();
const authService = require('../services/authService.js');
const User = require('../models/User.js')
const config = require('../config/config.json');

authRouter.get('/register', (req, res) => {
    res.render('auth-pages/register');
});

authRouter.post('/register', async (req, res) => {
    let { username, password, repeatPassword } = req.body;
    try {
        if (username.trim() == '' || password.trim() == '' || repeatPassword.trim() == '') {
            throw new Error('All field are required!');
        }
        if (password !== repeatPassword) {
            throw new Error('Please re-enter your password');
        }

        const match = await User.checkUsername(username);
        if (match) {
            throw new Error('Chosen username is taken');
        }

        await authService.registerUser(username, password);

        res.redirect('/login');

    } catch (err) {
        res.render('auth-pages/register', { err: err.message, username: username })
    }
});

authRouter.get('/login', (req, res) => {
    res.render('auth-pages/login');
});

authRouter.post('/login', async (req, res) => {
    let { username, password } = req.body;
    try {
        if (username.trim() == '' || password.trim() == '') {
            throw new Error('All field are required!');
        }
        const token = await authService.login(username, password);
        res.cookie(config.TOKEN_COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/');

    } catch (err) {
        res.render('auth-pages/login', { err: err.message });
    }
});

authRouter.get('/logout', (req, res) => {
    res.clearCookie(config.TOKEN_COOKIE_NAME);
    res.redirect('/');
})

module.exports = authRouter;