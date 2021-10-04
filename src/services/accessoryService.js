const Accessory = require('./../models/Accessory.js');

async function add(name,description,imageUrl){
    return Accessory.create({name,description,imageUrl});
}

const accessoryService = {
    add,
}

module.exports = accessoryService;