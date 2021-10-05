const attachAccessoryController = require('express').Router({ mergeParams: true });
const cubeService = require('../services/cubeService.js');
const accessoryService = require('./../services/accessoryService.js');


attachAccessoryController.get('/attach', async (req, res) => {
    try {
        let cube = await cubeService.findCube(req.params.cubeId)
        let accessories = await accessoryService.getAllAccessories();
        res.render('accessory/attach-accessory',{cube,accessories});
    } catch (err){
        res.status(400).render('400',{message:err.message});
    }
})

attachAccessoryController.post('/attach',async(req,res)=>{
    try{

    }catch (err){
        console.log(err);
        res.status(400).render('400',{message:err.message});
    }
})

module.exports = attachAccessoryController;