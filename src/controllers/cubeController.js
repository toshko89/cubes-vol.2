const express = require('express');
const cubeService = require('../services/cubeService.js');

const cubeController = new express.Router();

cubeController.get('/create', (req, res) => {
    res.render('create');
});

cubeController.post('/create', async (req, res) => {
    try {
        let { name, description, imageUrl, difficulty } = req.body;
        if (name !== '' && description !== '' && imageUrl !== '' && difficulty !== '') {
            await cubeService.add(name, description, imageUrl, difficulty);
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
        res.redirect('/cube/create');
    }
})

cubeController.get('/:cubeId', async (req, res) => {
    try {
        let currentCube = await cubeService.findCube(req.params.cubeId)
        res.render('details', { ...currentCube });
    }catch(err){
        console.log(err);
        res.render('404');
    }
})


module.exports = cubeController;