const cubeService = require('../services/cubeService.js');

exports.isOwner = async function (req, res, next) {
    let cube = await cubeService.findCube(req.params.cubeId);
    
    let creatorId = cube.creator[0]._id;
    if (creatorId == req.user._id) {
        req.cube = cube;
        next();
    } else {
        next('you are not authorized to edit this cube')
    }
}