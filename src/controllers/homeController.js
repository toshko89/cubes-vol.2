const express = require('express');
const cubeService = require('../services/cubeService.js')

const homeRouter = new express.Router();

homeRouter.get('/', async (req, res) => {
    try {
        let cubes = await cubeService.getAll();
        res.render('index', { cubes });
    } catch (err) {
        console.log(err);
        res.render('404');
    }
});

homeRouter.get('/search', async (req, res) => {
    try {
        let { search, from, to } = req.query;
        let cube = await cubeService.searchCube(search, from, to);
        console.log(cube);
        res.render('index', { cube });
    } catch (err) {
        res.render('index', { err });
    }
})

module.exports = homeRouter;