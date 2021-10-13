const Accesory = require('../models/Accessory.js');
const Cube = require('./../models/Cube.js');

async function add(name, description, imageUrl, difficulty) {
    let newCube = await new Cube({ name, description, imageUrl, difficulty });
    return newCube.save();

}

async function findCube(cubeId) {
    let result = await Cube.findById(cubeId).populate('accessories').lean();
    return result;
}

async function getAll() {
    return Cube.find({}).sort({'difficulty':1}).lean();
}

async function searchCube(search, from, to) {
    let result;
    if (search) {
        result = await Cube.find({'name':{$regex:search,'$options' : 'i'}});
        // result = result.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (from) {
        from = Number(from);
        result = result.filter(x => x.difficulty >= from);
    }
    if (to) {
        to = Number(to);
        result = result.filter(x => x.difficulty <= to);
    }

    return result;
}

async function attachAccessory(cubeId, accessoryId) {
    let cube = await Cube.findById(cubeId);
    let accessory = await Accesory.findById(accessoryId);

    cube.accessories.push(accessory);
    cube.save();
    return cube;
}

const cubeService = {
    add,
    findCube,
    searchCube,
    getAll,
    attachAccessory
}

module.exports = cubeService;
