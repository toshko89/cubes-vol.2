const express = require('express');
const Cube = require('./../models/Cube.js');

const cubeControler = new express.Router();

cubeControler.get('/create', (req, res) => {
    res.render('create');
});

cubeControler.post('/create', async (req, res) => {
    try {
        let { name, description, imageUrl, difficulty } = req.body;
        if (name !== '' && description !== '' && imageUrl !== '' && difficulty !== '') {
            let newCube = await new Cube({name, description, imageUrl, difficulty});
            await newCube.save();
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
        res.redirect('/cube/create');
    }
})

    cubeControler.get('/:cubeId', (req, res) => {
        let currentCube = Cube.findCube(req.params.cubeId)
        res.render('details', { ...currentCube });
    })

    module.exports = cubeControler;