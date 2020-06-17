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

        const keyTables = [];

        for (var key in mtgjson) {
            keyTables.push(key);
        }
        
        console.log(keyTables);
        console.log(keyTables.length);
        let total = 0;
        let timing = 500;

        var i = 0;
        function myLoop() {
            setTimeout(function() {
                console.log(`Set #${i} ${mtgjson[keyTables[i]].name} (${keyTables[i]})`);
                console.log('Card count:', mtgjson[keyTables[i]].cards.length, 'cards');
                
                var j = 0;
                function myInnerLoop() {
                    total++;
                    setTimeout(function() {
                        if (mtgjson[keyTables[i]].cards.length != 0) {

                            Card.findOne({ name: mtgjson[keyTables[i]].cards[j].name, targetSet: keyTables[i], number: mtgjson[keyTables[i]].cards[j].number}, (err, existingCard) => {
                                if (existingCard) {
                                    timing = 0;
                                    try {
                                        if (fs.existsSync(`../images/cards/${existingCard._id}.png`)) {
                                            j++;
                                            if (j < mtgjson[keyTables[i]].cards.length) {
                                                console.log(`${total} - ${mtgjson[keyTables[i]].cards[j].name} from ${keyTables[i]} already exists, moving on to next one`);
                                                
                                                myInnerLoop();
                                                return;
                                            }
                                            else {
                                                i++;
                                                if (i < keyTables.length) {
                                                    myLoop();
                                                    return;
                                                }
                                                else {
                                                    console.log('Card database setup done!')
                                                }
                                            }
                                        }
                                    } catch(err) {
                                        console.error(err)
                                    }
                                }
                                timing = 500;
    
                                request(`https://api.scryfall.com/cards/${mtgjson[keyTables[i]].cards[j].scryfallId}`, { json: true }, (err, res, body) => {
                                    if (err) { return console.log('error at getting preliminary card info', err); }
                                    // TODO: Get other image formats for mobile devices
    
                                    // SAVING TO DB
                                    const card = new Card({...mtgjson[keyTables[i]].cards[j], targetSet: keyTables[i]});
                                    card.save(function (err, card) {
                                        if (err) return console.error('error at getting card image', err);
    
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
                                                    url = body.card_faces[k].image_uris.png;
                                                    break;
                                                }
                                            }
                                        }
                                        else {
                                            console.log('Something went wrong! We found nothing from scryfall!', body)
                                        }
    
                                        download(url, path, (res) => {
                                            console.log(`✅ ${res.statusCode} => [${j}] - ${mtgjson[keyTables[i]].cards[j].name} from ${i} - ${keyTables[i]} fetched! (${total})`)
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
                    }, timing)
                }

                myInnerLoop();
            }, timing)
        }
        myLoop();
    });
});
