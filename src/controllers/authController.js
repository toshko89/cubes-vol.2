const authRouter = require('express').Router();
const authService = require('../services/authService.js');


authRouter.get('/register', (req, res) => {
    res.render('auth-pages/register');
});

authRouter.post('/register', async (req, res) => {
    let { username, password, repeatPassword } = req.body;
    try {
        if (username == '' || password == '' || repeatPassword == '') {
            throw new Error('All field are required!');
        }
        if (password !== repeatPassword) {
            throw new Error('Please re-enter your password');
        }

        const match = await authService.checkUsername(username);
        if (match.length > 0) {
            throw new Error('Chosen username is taken');
        }

        await authService.registerUser(username, password);

        res.redirect('/login');

    } catch (err) {
        res.render('auth-pages/register', { err: err.message })
    }
});

authRouter.get('/login', (req, res) => {
    res.render('auth-pages/login');
});

authRouter.post('/login', (req, res) => {
    let { username, password } = req.body;
    try {
        if (username == '' || password == '') {
            throw new Error('All field are required!');
        }

    } catch (err) {

    }
});

authRouter.get('/logout', (req, res) => {
    res.redirect('/');
})

module.exports = authRouter;