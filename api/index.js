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
        var Card = mongoose.model('Card', CardSchema);

        Card.count().exec((err, count) => {
            
            // Get a random entry
            var random = Math.floor(Math.random() * count)

            Card.findOne().skip(random).exec((err, card) => {
                console.log("found this card!", card.name);
                res.send(card);
            })
        });
    })
    
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})
