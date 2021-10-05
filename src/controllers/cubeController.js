const express = require('express');
const cubeService = require('../services/cubeService.js');
const attachAccessoryController = require('./attachAccessoryController.js');

const cubeController = new express.Router();

cubeController.get('/create', (req, res) => {
    res.render('create');
});

cubeController.post('/create', async (req, res) => {
    try {
        let { name, description, imageUrl, difficulty } = req.body;
        if (name !== '' && description !== '' && imageUrl !== '' && difficulty !== '') {
            await cubeService.add(name, description, imageUrl, difficulty);
            return res.redirect('/');
        }
        res.status(400).render('400',{message:'All fields are required',path:req.originalUrl});

    } catch (err) {
        console.log(err);
        res.status(400).render('400',{message:err.message,path:req.originalUrl});
    }
})

cubeController.get('/:cubeId', async (req, res) => {
    try {
        let currentCube = await cubeService.findCube(req.params.cubeId)
        res.render('partials/details', { ...currentCube });
    } catch (err) {
        console.log(err);
        res.render('404');
    }
})

cubeController.use('/:cubeId/accessory', attachAccessoryController);

module.exports = cubeController;