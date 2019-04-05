var mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()

var bodyParser = require('body-parser')

var CardSchema = require('./Schemas/Card');
var UserSchema = require('./Schemas/User');


app.use(cors({credentials: true, origin: true}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 3000

mongoose.connect('mongodb://localhost/mtgdb', {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    console.log("Connected to Database!");
    
    app.get('/', (req, res) => {
        console.log("lel");
        
        res.send('Hello World!')
    })
    app.get('/randomcard', (req, res) => {
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
    app.post('/user', (req, res) => {
        var User = mongoose.model('User', UserSchema);
        var Card = mongoose.model('Card', CardSchema);
        
        var userform = req.body;

        // Let's make sure the email is not already taken
        User.find({ email: userform.email }, function (err, docs) {
            console.log('Total findings:', docs);
            if (docs.length >= 1) {
                // return error
                res.send({isTaken: true});
                return;
            }
            // user doesnt exist, let's create him then
            // Get a random card entry

            Card.countDocuments().exec((err, count) => {
                var random = Math.floor(Math.random() * count)
    
                Card.findOne().skip(random).exec((err, card) => {
                    console.log("found this card!", card.name);
                    userform.profile_picture = card;

                    // asign player color too
                    // created at
                    // isactive

                    var userdoc = new User(userform);
                    userdoc.save(function (err) {
                        if (err) console.log(err);
                        console.log('user created and saved to db!');
                        
                        // send email here
    
                        // perform login for the user and send his token
    
                        res.send({isSaved: true});
                    })
                })
            });
        });        
    })
    
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})
