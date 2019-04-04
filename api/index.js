var mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()

var CardSchema = require('./Schemas/Card');

app.use(cors({credentials: true, origin: true}))
const port = 3000

mongoose.connect('mongodb://localhost/mtgdb', {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    console.log("Connected to Database!");
    
    const cardsJson = require('../AllSets.json');
    
    app.get('/', (req, res) => {
        console.log("lel");
        
        res.send('Hello World!')
    })
    app.get('/getRandomCard', (req, res) => {
        // console.log("lel")
        // console.log(cardsJson);
        // console.log(cardsJson);

        var Card = mongoose.model('Card', CardSchema);

        Card.count().exec((err, count) => {
            
            // Get a random entry
            var random = Math.floor(Math.random() * count)

            // Again query all users but only fetch one offset by our random #
            Card.findOne().skip(random).exec((err, card) => {
                // Tada! random user
                console.log("found this card!", card.name);
                res.send(card);
            })
        });

        // res.send(cardsJson)
        // const keys = Object.keys(cardsJson)
        // const key = keys[Math.floor(Math.random() * keys.length)]
        // console.log(key);
        // const cards = cardsJson[key].cards;
        // const card = cards[Math.floor(Math.random() * cards.length)]
        // console.log(card.name);
        // const url = "https://img.scryfall.com/cards/large/en/" + key.toLowerCase() + "/" + card.number + ".jpg";
        // res.send(url)
    })
    
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})
