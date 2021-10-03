const Cube = require('./../models/Cube.js');

async function add(name, description, imageUrl, difficulty) {
    let newCube = await new Cube({ name, description, imageUrl, difficulty });
    return newCube.save();

}

function findCube(cubeId) {
    
}

async function getAll(){
    return Cube.find({}).lean();
}

async function searchCube(search, from, to) {
    let result = Cube.find({})

    if (search) {
        result = result.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
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

const cubeService = {
    add,
    findCube,
    searchCube,
    getAll
}

module.exports = cubeService;
