const express = require('express');
const { isAuth } = require('../middleWares/authMiddleWare.js');
const { isOwner } = require('../middleWares/cubeOwnerMiddleWare.js');
const cubeService = require('../services/cubeService.js');
const attachAccessoryController = require('./attachAccessoryController.js');

const cubeController = new express.Router();

cubeController.get('/create', isAuth, (req, res) => {
    res.render('cube-pages/create-cube');
});

cubeController.post('/create', isAuth, async (req, res) => {
    try {
        let { name, description, imageUrl, difficulty } = req.body;
        let creator = req.user;
        if (name.trim() !== '' && description.trim() !== '' && imageUrl.trim() !== '') {
            await cubeService.add(name, description, imageUrl, difficulty, creator);
            return res.redirect('/');
        }
        res.status(400).render('400', { message: 'All fields are required', path: req.originalUrl });

    } catch (err) {
        console.log(err);
        res.status(400).render('400', { message: err.message, path: req.originalUrl });
    }
});

cubeController.get('/:cubeId', async (req, res) => {
    try {
        let cube = await cubeService.findCube(req.params.cubeId);
        let isOwnCube = false;
        if (req.user) {
            isOwnCube = cube.creator._id == req.user._id ? true : false;
        }
        res.render('partials/details', { ...cube, isOwnCube });
    } catch (err) {
        console.log(err);
        res.render('404');
    }

});

cubeController.get('/:cubeId/delete', isAuth, isOwner, (req, res) => {
    res.render('cube-pages/delete-cube', req.cube);
});

cubeController.post('/:cubeId/delete', isAuth, isOwner, async (req, res) => {
    try {
        await cubeService.deleteCube(req.cube._id);
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
        res.status(404).render('404', err);
    }
});

cubeController.get('/:cubeId/edit', isAuth, isOwner, (req, res) => {
    res.render('cube-pages/edit-cube', req.cube);
});

cubeController.post('/:cubeId/edit', isAuth, isOwner, async (req, res) => {
    try {
        let { name, description, imageUrl, difficulty } = req.body;
        let cube = { name, description, imageUrl, difficulty };
        await cubeService.updateCube(req.cube._id, cube);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.redirect(`/cube/${req.params.cubeId}`);
    }
});

cubeController.use('/:cubeId/accessory', isAuth, attachAccessoryController);

module.exports = cubeController;