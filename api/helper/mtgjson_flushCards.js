var fs = require('fs');
var mongoose = require('mongoose');
var CardSchema = require('../Schemas/Card');

mongoose.connect('mongodb://localhost/mtgdb', {useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    // Making model using the schema
    var Card = mongoose.model('Card', CardSchema);
    
    Card.find({}, (err, cards) => {
        fs.readdir('../images/cards/', (err, files) => {

            let cardsFromDBToBeRemoved = [];

            for (let i = 0; i < cards.length; i++) {
                let hasBeenLocated = false;
                for (let j = 0; j < files.length; j++) {
                    if (cards[i]._id.toString() === files[j].split('.')[0]) {
                        hasBeenLocated = true;
                        break;
                    }
                }
                if (!hasBeenLocated) {
                    cardsFromDBToBeRemoved.push(cards[i]._id);
                }
            }

            Card.deleteMany({_id: {$in: cardsFromDBToBeRemoved}}, (err) => {
                Card.find({}, (err, cards) => {
                    let filesToBeRemoved = [];

                    for (let i = 0; i < files.length; i++) {
                        let hasBeenLocated = false;
                        for (let j = 0; j < cards.length; j++) {
                            if (cards[j]._id.toString() === files[i].split('.')[0]) {
                                hasBeenLocated = true;
                                break;
                            }
                        }
                        if (!hasBeenLocated) {
                            filesToBeRemoved.push(files[i]);
                        }
                    }

                    for (let i = 0; i < filesToBeRemoved.length; i++) {
                        fs.unlinkSync(`../images/cards/${filesToBeRemoved[i]}`);
                    }
                    console.log(`flush complete, ${cardsFromDBToBeRemoved.length} DB entries removed and ${filesToBeRemoved.length} images have been removed`);
                    db.close();
                })
            })
        });
    })
});