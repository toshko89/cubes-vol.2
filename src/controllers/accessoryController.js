const express = require('express');
const accessoryService = require('./../services/accessoryService.js');

const accessoryController = new express.Router();

accessoryController.get('/create', (req, res) => {
    res.render('accessory/add-accessory');
})

accessoryController.post('/create', async (req, res) => {
    try {
        let { name, description, imageUrl } = req.body;
        if (name !== '' && description !== '' && imageUrl !== '') {
            await accessoryService.add(name, description, imageUrl);
            return res.redirect('/');
        }

        res.status(400).render('400',{message:'All fields are required',path:req.originalUrl});

    } catch (err) {
        console.log(err);
        res.status(400).render('400',{message:err.message});
    }
})

module.exports = accessoryController;