var fs = require('fs');

const mtgjson_file = process.argv[2]

fs.readFile(mtgjson_file, function (err, mtgdata) {
    if (err) {
        throw err; 
    }

    var mtgjson = JSON.parse(mtgdata.toString());
    
    // Creating new temporary folder to store each set as a individual json objecty
    var dir = './tmp';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    } 

    for (var key in mtgjson) {
        console.log(key);
        var json = JSON.stringify(mtgjson[key]);
        fs.writeFile('./tmp/' + key + '.json', json, 'utf8', (err) => {
            if (err) throw err;
        })
    }
});