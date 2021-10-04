const attachAccessoryController = require('express').Router({ mergeParams: true });
const cubeService = require('../services/cubeService.js');
const accessoryService = require('./../services/accessoryService.js');


attachAccessoryController.get('/attach', async (req, res) => {
    try {
        let cube = await cubeService.findCube(req.params.cubeId)
        let accessories = await accessoryService.getAllAccessories();
        res.render('accessory/attach-accessory',{cube,accessories});
    } catch (err){
        res.status(400).send(err.message).end();
    }
})

module.exports = attachAccessoryController;