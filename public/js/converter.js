const obj2gltf = require('obj2gltf');
const fs = require('fs');
obj2gltf('../assets/pineTreeFinal.obj')
    .then(function(gltf) {
        const data = Buffer.from(JSON.stringify(gltf));
        fs.writeFileSync('../assets/pineTreeFinal.gltf', data);
    });