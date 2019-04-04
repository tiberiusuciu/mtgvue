var fs = require('fs');

const mtgjson_file = process.argv[2]

// Fetching all cards
fs.readFile(mtgjson_file, (err, mtgdata) => {
    if (err) {
        throw err; 
    }

    var mtgjson = JSON.parse(mtgdata.toString());
    var count = 0;
    for (var key in mtgjson) {
        console.log("Getting all cards from:", key);
        count += mtgjson[key].cards.length;
    }
    console.log("Total count is", count);
    
});