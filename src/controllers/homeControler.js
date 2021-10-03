const express = require('express');
const cubeService = require('./../services/cubeService.js')

const homeRouter = new express.Router();

homeRouter.get('/', async (req, res) => {
    try {
        let cubes = await cubeService.getAll;
        res.render('index', { cubes });
    } catch (err) {
        console.log(err);
        res.render('404');
    }

});

homeRouter.get('/search', (req, res) => {
    let { search, from, to } = req.query;
    let cubes = cubeService.searchCube(search, from, to);
    res.render('index', { cubes });
})

module.exports = homeRouter;