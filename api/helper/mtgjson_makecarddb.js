var fs = require('fs');
var mongoose = require('mongoose');
const request = require('request');
var CardSchema = require('../Schemas/Card');

mongoose.connect('mongodb://localhost/mtgdb', {useNewUrlParser: true, useUnifiedTopology: true });

const mtgjson_file = process.argv[2]

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    console.log('attempting to read cards');
    
    // Making model using the schema
    var Card = mongoose.model('Card', CardSchema);

    // Fetching all cards
    fs.readFile(mtgjson_file, (err, mtgdata) => {
        if (err) {
            throw err; 
        }

        var mtgjson = JSON.parse(mtgdata.toString());

        // var i = 1;                  //  set your counter to 1

        // function myLoop() {         //  create a loop function
        // setTimeout(function() {   //  call a 3s setTimeout when the loop is called
        //     console.log('hello');   //  your code here
        //     i++;                    //  increment the counter
        //     if (i < 10) {           //  if the counter < 10, call the loop function
        //     myLoop();             //  ..  again which will trigger another 
        //     }                       //  ..  setTimeout()
        // }, 3000)
        // }

        // myLoop(); 

        const keyTables = [];

        for (var key in mtgjson) {
            // console.log("Getting all cards from:", key);
            // console.log('here is a preview', mtgjson[key]);
            keyTables.push(key);
        }
        
        console.log(keyTables);
        console.log(keyTables.length);

        var i = 0;
        function myLoop() {
            setTimeout(function() {
                console.log('this set:', i, keyTables[i]);
                console.log('Card count:', mtgjson[keyTables[i]].cards.length, 'cards');
                
                var j = 0;
                function myInnerLoop() {
                    setTimeout(function() {
                        if (mtgjson[keyTables[i]].cards.length != 0) {

                            request(`https://api.scryfall.com/cards/${mtgjson[keyTables[i]].cards[j].scryfallId}`, { json: true }, (err, res, body) => {
                                if (err) { return console.log(err); }
                                // TODO: Get other image formats for mobile devices

                                // SAVING TO DB
                                const card = new Card(mtgjson[keyTables[i]].cards[j]);
                                card.save(function (err, card) {
                                    if (err) return console.error(err);

                                    // DOWNLOADING CARD IMAGE
                                    const download = (url, path, callback) => {
                                        request.head(url, (err, res, body) => {
                                        request(url)
                                            .pipe(fs.createWriteStream(path))
                                            .on('close', () => {callback(res)})
                                        })
                                    }

                                    let url;
                                    const path = `../images/cards/${card._id}.png`

                                    if (body.image_uris) {
                                        url = body.image_uris.png
                                    }
                                    else if (body.card_faces) {
                                        //  Edge case for double faced card
                                        for (let k = 0; k < body.card_faces.length; k++) {
                                            if(body.card_faces[k].name === card.name) {
                                                url = card_faces[k].image_uris.png;
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        console.log('Something went wrong! We found nothing from scryfall!', body)
                                    }

                                    download(url, path, (res) => {
                                        console.log(`✅ ${res.statusCode} => [${j}] - ${mtgjson[keyTables[i]].cards[j].name} from ${i} - ${keyTables[i]} fetched!`)
                                        j++;
                                        if (j < mtgjson[keyTables[i]].cards.length) {
                                            myInnerLoop();
                                        }
                                        else {
                                            i++;
                                            if (i < keyTables.length) {
                                                myLoop();
                                            }
                                            else {
                                                console.log('Card database setup done!')
                                            }
                                        }
                                    })
                                });
                            });

                        }
                        else {
                            // TODO: you will want to manage tokens at one point eventually right here
                            // console.log(mtgjson[keyTables[i]]);
                            i++;
                            if (i < keyTables.length) {
                                myLoop();
                            }
                            else {
                                console.log('Card database setup done!')
                            }
                        }
                    }, 1000)
                }
                myInnerLoop();
            }, 1000)
        }
        myLoop();
        // console.log(mtgjson['DKA']);
        

// mtgjson[key].cards.length
            // for (var i = 0; i < 5; i++) {
            //     var card = new Card(mtgjson[key].cards[i]);
            //     // card.core_fallbackLinks[0] = "https://img.scryfall.com/cards/large/en/" + key.toLowerCase() +"/" + mtgjson[key].cards[i].number + ".jpg";
            //     // card.core_fallbackLinks[1] = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + mtgjson[key].cards[i].multiverseId + "&type=card";

            //     // request(`https://api.scryfall.com/cards/${card.scryfallId}`, { json: true }, (err, res, body) => {
            //     //     if (err) { return console.log(err); }
            //     //     // console.log(body.url);
            //     //     // console.log(body.explanation);
            //     //     callback(body);
            //     // });

            //     console.log('Iterating...');
                


            //     card.core_set = key.toLowerCase();
            //     card.save(function (err, card) {
            //         if (err) return console.error(err);
            //     });
            // }
        // }
        // console.log("Done!");
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
