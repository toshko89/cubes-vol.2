const express = require('express');
const Cube = require('../models/createCube.js');

const cubeControler = new express.Router();

cubeControler.get('/create', (req, res) => {
    res.render('create');
});

cubeControler.post('/create', (req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;
    if (name !== '' && description !== '' && imageUrl !== '' && difficulty !== '') {
        let newCube = new Cube(name, description, imageUrl, difficulty);
        Cube.add(newCube);
        res.redirect('/');
    }else{
        res.redirect('/cube/create');
    }
});

cubeControler.get('/:cubeId', (req, res) => {
    let currentCube = Cube.findCube(req.params.cubeId)
    res.render('details', { ...currentCube });
})

module.exports = cubeControler;