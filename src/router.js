const express = require('express');
const homeControler = require('./controllers/homeControler.js');
const cubeControler = require('./controllers/cubeControler.js');

const router = new express.Router();

router.use(homeControler);

router.use('/cube',cubeControler);

router.get('/about',(req,res)=>{
    res.render('about')
});

router.get('*',(req,res)=>{
    res.render('404')
});

module.exports = router;