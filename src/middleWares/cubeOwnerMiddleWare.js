const cubeService = require('../services/cubeService.js');

exports.isOwner = async function (req, res, next) {
    try {
        let cube = await cubeService.findCube(req.params.cubeId);
        if (cube.creator._id === req.user._id) {
            req.cube = cube;
            next();
        } else {
            next('you are not authorized to edit this cube')
        }
    } catch (err) {
        console.log(err);
    }
}