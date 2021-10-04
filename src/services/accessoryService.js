const Accessory = require('./../models/Accessory.js');

async function add(name,description,imageUrl){
    return Accessory.create({name,description,imageUrl});
}

async function getAccessory(accessoryId){
    let result = await Accessory.findById(accessoryId).lean();
    return result;
}

async function getAllAccessories(){
    return Accessory.find({}).lean();
}

const accessoryService = {
    add,
    getAccessory,
    getAllAccessories,
}

module.exports = accessoryService;