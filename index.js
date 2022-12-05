//parse NantesData.json
var fs = require('fs');
var data = fs.readFileSync('nantesData.json');
var json = JSON.parse(data);

//for each element in the json file
for (var i = 0; i < json.length; i++) {
    console.log(json[i].fields.numero);
    console.log(json[i]['geometry']['coordinates']);
}

// Path: index.js