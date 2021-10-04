const attachController = require('express').Router();
const accessoryService = require('./../services/accessoryService.js');


attachController.get('/accessory',(req,res)=>{
    res.render('attach-accessory');
})

module.exports = attachController;