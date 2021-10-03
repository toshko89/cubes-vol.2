const express = require('express');
const Cube = require('../../services/cubeService.js');

const homeRouter = new express.Router();

homeRouter.get('/', (req, res) => {

    let cubes = Cube.cubes;

    res.render('index', { cubes });

});

homeRouter.get('/search', (req, res) => {
    let { search, from, to } = req.query;
    let cubes = Cube.searchCube(search, from, to);
    res.render('index', { cubes });
})

module.exports = homeRouter;