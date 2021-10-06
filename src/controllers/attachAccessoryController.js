const attachAccessoryController = require('express').Router({ mergeParams: true });
const cubeService = require('../services/cubeService.js');
const accessoryService = require('./../services/accessoryService.js');


attachAccessoryController.get('/attach', async (req, res) => {
    try {
        let [cube, accessories] = await Promise.all([
            cubeService.findCube(req.params.cubeId),
            accessoryService.getAllAccessories()
        ]);
        res.render('accessory/attach-accessory', { cube, accessories });
    } catch (err) {
        res.render('404')
    }
})

attachAccessoryController.post('/attach', async (req, res) => {
    try {
        let [result, cube] = await Promise.all([
            cubeService.attachAccessory(req.params.cubeId, req.body.accessory),
            cubeService.findCube(req.params.cubeId),
            // accessoryService.getAllAccessories()
        ])

        res.render('partials/details', { ...cube });
    } catch (err) {
        console.log(err);
        res.status(400).render('400', { message: err.message, path: req.originalUrl });
    }
})

module.exports = attachAccessoryController;