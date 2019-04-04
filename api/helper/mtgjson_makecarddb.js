var fs = require('fs');
var mongoose = require('mongoose');
var CardSchema = require('../Schemas/Card');

mongoose.connect('mongodb://localhost/mtgdb', {useNewUrlParser: true});

const mtgjson_file = process.argv[2]

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    // Making model using the schema
    var Card = mongoose.model('Card', CardSchema);

    // Fetching all cards
    fs.readFile(mtgjson_file, (err, mtgdata) => {
        if (err) {
            throw err; 
        }

        var mtgjson = JSON.parse(mtgdata.toString());

        for (var key in mtgjson) {
            console.log("Getting all cards from:", key);

            for (var i = 0; i < mtgjson[key].cards.length; i++) {
                var card = new Card(mtgjson[key].cards[i]);
                card.core_fallbackLinks[0] = "https://img.scryfall.com/cards/large/en/" + key.toLowerCase() +"/" + mtgjson[key].cards[i].number + ".jpg";
                card.core_fallbackLinks[1] = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + mtgjson[key].cards[i].multiverseId + "&type=card";
                card.core_set = key.toLowerCase();
                card.save(function (err, card) {
                    if (err) return console.error(err);
                });
            }
        }
        console.log("Done!");
    });
});

// Use this in another file (it imports all sets to mongodb)
// exec('/c/Program Files/MongoDB/Server/4.0/bin/mongoimport.exe --db mtgdb --collection allset --file ~/Documents/labs/mtgvue/api/helper/tmp/' + key + '.json', (err, stdout, stderr) => {
//     if (err) {
//       // node couldn't execute the command
//       return;
//     }
  
//     // the *entire* stdout and stderr (buffered)
//     console.log(`stdout: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
//   });
