var fs = require('fs');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mtgdb', {useNewUrlParser: true});

const mtgjson_file = process.argv[2]

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    var cardSchema = new mongoose.Schema({
        artist: String,
        borderColor: String,
        colorIdentity: Array,
        colors: Array,
        convertedManaCost: Number,
        flavorText: String,
        foreignData: Array,
        frameVersion: String,
        hasFoil: Boolean,
        hasNonFoil: Boolean,
        layout: String,
        legalities: Object,
        manaCost: String,
        multiverseId: Number,
        name: String,
        number: String,
        originalText: String,
        originalType: String,
        power: String,
        printings: Array,
        rarity: String,
        rulings: Array,
        scryfallId: String,
        scryfallIllustrationId: String,
        scryfallOracleId: String,
        subtypes: Array,
        supertypes: Array,
        tcgplayerProductId: Number,
        tcgplayerPurchaseUrl: String,
        text: String,
        toughness: String,
        type: String,
        types: Array,
        uuid: String,
        uuidV421: String,
        core_imageLink: Array
    }, { collection: 'cards' });

    // Making model using the schema
    var Card = mongoose.model('Card', cardSchema);

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
                card.save(function (err, card) {
                    if (err) return console.error(err);
                });
            }
        }
    });
});

return false;

// fs.readFile(mtgjson_file, function (err, mtgdata) {
//     if (err) {
//         throw err; 
//     }

//     var mtgjson = JSON.parse(mtgdata.toString());
    
//     // Creating new temporary folder to store each set as a individual json objecty
//     var dir = './tmp';
//     if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir);
//     } 

//     for (var key in mtgjson) {
//         console.log(key);
//         var json = JSON.stringify(mtgjson[key]);
//         fs.writeFile('./tmp/' + key + '.json', json, 'utf8', (err) => {
//             if (err) throw err;

//         })
//     }
//     // console.log(mtgjson.length);
    
    
// });

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
