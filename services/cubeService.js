
// class Cube {

//     // static #DB = [
//     //     {
//     //         id: 'asdfjnkldfvkjlzs',
//     //         name: 'Mirror Cube',
//     //         description: 'Strange Cube',
//     //         imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Mirror_Cube_solved.png/1200px-Mirror_Cube_solved.png',
//     //         difficulty: '4'
//     //     },
//     // ];

//     constructor(name, description, imageUrl, difficulty) {
//         this.id = id();
//         this.name = name;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this.difficulty = Number(difficulty);
//     }

//     static add(cube) {
//         cubeDB.push(cube);
//         let result = JSON.stringify(cubeDB, '', 2);
//         fs.writeFile('./src/config/cubeDB.json', result, (err, data) => {
//             if (err) {
//                 console.log(err);
//                 return;
//             }
//         })

//     }

//     static get cubes() {
//         let data = fs.readFileSync('./src/config/cubeDB.json', 'utf8')
//         data = JSON.parse(data);
//         return data;
//     }

//     static findCube(cubeId) {
//         let data = fs.readFileSync('./src/config/cubeDB.json', 'utf8')
//         data = JSON.parse(data);
//         return data.find(x => x.id === cubeId);
//     }

//     static searchCube(search, from, to) {
//     let result = Cube.cubes

//     if (search) {
//         result = Cube.cubes.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
//     }
//     if (from) {
//         from = Number(from);
//         result = Cube.cubes.filter(x => x.difficulty >= from);
//     }
//     if (to) {
//         to = Number(to);
//         result = Cube.cubes.filter(x => x.difficulty <= to);
//     }

//     return result;
// }
// }

// module.exports = Cube;