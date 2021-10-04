const attachAccessoryController = require('express').Router();

attachAccessoryController.get('/accessory/:Id',(req,res)=>{
    res.render('accessory/attach-accessory');
})

module.exports = attachAccessoryController;