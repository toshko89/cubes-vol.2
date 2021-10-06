const attachAccessoryController = require('express').Router({ mergeParams: true });
const cubeService = require('../services/cubeService.js');
const accessoryService = require('./../services/accessoryService.js');


attachAccessoryController.get('/attach', async (req, res) => {
    try {
        let cube = await cubeService.findCube(req.params.cubeId);
        let accessories = await accessoryService.getAllAccessoriesWithout(cube.accessories.map(x => x._id))
        res.render('accessory/attach-accessory', { cube, accessories });
    } catch (err) {
        console.log(err);
        res.render('404')
    }
})

attachAccessoryController.post('/attach', async (req, res) => {
    try {
        await Promise.all([
            cubeService.attachAccessory(req.params.cubeId, req.body.accessory),
            cubeService.findCube(req.params.cubeId),
        ]);
        
        res.redirect(`/cube/${req.params.cubeId}`);
    } catch (err) {
        console.log(err);
        res.status(400).render('400', { message: err.message, path: req.originalUrl });
    }
})

module.exports = attachAccessoryController;