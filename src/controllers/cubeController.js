const express = require('express');
const { isAuth } = require('../middleWares/authMiddleWare.js');
const { isOwner } = require('../middleWares/cubeAuthMiddleWare.js');
const cubeService = require('../services/cubeService.js');
const attachAccessoryController = require('./attachAccessoryController.js');

const cubeController = new express.Router();

cubeController.get('/create',isAuth, (req, res) => {
    res.render('cube-pages/create-cube');
});

cubeController.post('/create',isAuth, async (req, res) => {
    try {
        let { name, description, imageUrl, difficulty } = req.body;
        let creator = req.user;
        if (name.trim() !== '' && description.trim() !== '' && imageUrl.trim() !== '') {
            await cubeService.add(name, description, imageUrl, difficulty,creator);
            return res.redirect('/');
        }
        res.status(400).render('400',{message:'All fields are required',path:req.originalUrl});

    } catch (err) {
        console.log(err);
        res.status(400).render('400',{message:err.message,path:req.originalUrl});
    }
});

cubeController.get('/:cubeId', async (req, res) => {
    try {
        let cube = await cubeService.findCube(req.params.cubeId);
        res.render('partials/details', { ...cube });
    } catch (err) {
        console.log(err);
        res.render('404');
    }
});

cubeController.get('/:cubeId/delete',isOwner,(req,res)=>{
    console.log(req.cube);
    res.render('cube-pages/delete-cube',req.cube);
})

cubeController.use('/:cubeId/accessory',isAuth, attachAccessoryController);

module.exports = cubeController;