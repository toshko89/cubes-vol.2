const express = require('express');
const homeController = require('./controllers/homeController.js');
const cubeController = require('./controllers/cubeController.js');
const accessoryController = require('./controllers/accessoryController.js');
const authController = require('./controllers/authController.js');


const router = new express.Router();

router.use(homeController);
router.use('/cube',cubeController);
router.use('/accessory',accessoryController);
router.use(authController);

router.get('/about',(req,res)=>{
    res.render('about')
});

router.get('*',(req,res)=>{
    res.render('404')
});

module.exports = router;