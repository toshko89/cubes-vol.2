const express = require('express');

const accessoryController = new express.Router();

accessoryController.get('/create',(req,res)=>{
    res.render('add-accessory');
})

accessoryController.post('/create',(req,res)=>{
    
})

module.exports = accessoryController;