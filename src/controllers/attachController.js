const attachController = require('express').Router();
const accessoryService = require('./../services/accessoryService.js');


attachController.get('/accessory/:Id',(req,res)=>{
    res.render('accessory/attach-accessory');
})

module.exports = attachController;