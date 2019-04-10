var mongoose = require('mongoose')
const express = require('express')
const nodemailer = require("nodemailer");
var bodyParser = require('body-parser')
var bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const cors = require('cors')

const app = express()

var CardSchema = require('./Schemas/Card');
var UserSchema = require('./Schemas/User');

const storedCredentials = require('./Untracked/credentials');

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
        res.send('Hello World!')
    })
    app.get('/randomcard', (req, res) => {
        var Card = mongoose.model('Card', CardSchema);

        Card.countDocuments().exec((err, count) => {
            
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
            if (docs.length >= 1) {
                // return error
                res.send({errorCode: "EMAIL_TAKEN"});
                return;
            }
            // user doesnt exist, let's create him then
            Card.countDocuments().exec((err, count) => {
                var random = Math.floor(Math.random() * count)
    
                Card.findOne().skip(random).exec((err, card) => {
                    userform.profile_picture = card;
                    userform.color = 'dodgerblue';
                    userform.createdAt = new Date();
                    userform.isActive = false;

                    var userdoc = new User(userform);
                    userdoc.save(function (err) {
                        if (err) console.log(err);

                        // generate email hash
                        var salt = bcrypt.genSaltSync(10);
                        var hash = bcrypt.hashSync(userform.email, salt);

                        // send email
                        const output = `
                            <h2>Thank you for signing-up!</h2>
                            <p>Please click the provided link below to finish up your account registration</p>
                            <br>
                            <a href="http://localhost:3000/confirmuser?hash=${hash}">http://localhost:3000/confirmuser?hash=${hash}</a>
                        `;

                        // create reusable transporter object using the default SMTP transport
                        let transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 587,
                            secure: false, // true for 465, false for other ports
                            auth: {
                                user: storedCredentials.emailCredentials.email, // generated ethereal user
                                pass: storedCredentials.emailCredentials.password  // generated ethereal password
                            },
                            tls:{
                                rejectUnauthorized:false
                            }
                        });

                        // setup email data with unicode symbols
                        let mailOptions = {
                            from: '"MTGVUE" <noreply.mtgvue@gmail.com>', // sender address
                            to: userform.email, // list of receivers
                            subject: 'User Registration', // Subject line
                            text: 'Hello world?', // plain text body
                            html: output // html body
                        };

                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }

                            res.send({errorCode: false});
                        });
                    })
                })
            });
        });        
    });

    app.get('/confirmuser', (req, res) => {
        var User = mongoose.model('User', UserSchema);
        User.find({} , (err, users) => {
            if(err) console.log(err);
            users.map(user => {
                if (bcrypt.compareSync(user.email, req.query.hash)) {
                    validatedEmail = user.email;
                    user.isActive = true;
                    user.save();
                    return;
                }
            })
            res.redirect('http://localhost:8080/login')
        })
    });

    app.post('/login', (req, res) => {
        var User = mongoose.model('User', UserSchema);
        var notFound = true;
        
        // console.log('checking for token');
        // check for token for autologin
        if (req.body.token) {
            // console.log('token found, verifying');
            
            jwt.verify(req.body.token, storedCredentials.jwt.secretkey, (err, authData) => {
                if (err) {
                    res.send({
                        errorCode: "TOKEN_INVALID"
                    })
                }
                else {
                    // console.log('token valid, lets locate user', authData);

                    // checking for expiration
                    if (authData['iat'] >= authData['exp']) {
                        // console.log('token expired!');
                    }
                    else {
                        // console.log('token not expired yet');
                        const email = authData.user.email;
    
                        if (email) {
                            // go fetch the user
                            // console.log('found an email in the token', email);

                            User.find({} , (err, users) => {
                                if(err) {
                                    console.log(err);
                                    res.send({
                                        errorCode: "ERROR_LOGIN"
                                    })
                                    return;
                                }
                                users.map(user => {
                                    if (user.email === email) {
                                        notFound = false;
                                        // Alternatively, we could send the entire object, minus the password, without surgically selecting each field
                                        const userNoPassword = {
                                            username: user.username,
                                            color: user.color,
                                            createdAt: user.createdAt,
                                            decks: user.decks,
                                            email: user.email,
                                            isActive: user.isActive,
                                            profile_picture: user.profile_picture,
                                            id: user._id
                                        };

                                        res.send({
                                            errorCode: false,
                                            user: userNoPassword
                                        })
                                    }
                                })
                                if (notFound) {
                                    res.send({
                                        errorCode: "ERROR_LOGIN_CREDENTIALS"
                                    })
                                }
                            });
                        }
                    }
                }
            });

        }
        else {
            User.find({} , (err, users) => {
                if(err) {
                    console.log(err);
                    res.send({
                        errorCode: "ERROR_LOGIN"
                    })
                    return;
                }
                users.map(user => {
                    if (user.email === req.body.email) {
                        notFound = false;
                        if (bcrypt.compareSync(req.body.password, user.password)) {
                            // Alternatively, we could send the entire object, minus the password, without surgically selecting each field
                            const userNoPassword = {
                                username: user.username,
                                color: user.color,
                                createdAt: user.createdAt,
                                decks: user.decks,
                                email: user.email,
                                isActive: user.isActive,
                                profile_picture: user.profile_picture,
                                id: user._id
                            };
    
                            const userPayload = {
                                email: user.email
                            }
                            
                            jwt.sign({user: userPayload}, storedCredentials.jwt.secretkey, { expiresIn: '1d' }, (err, token) => {
                                if (err) {
                                    console.log(err); 
                                }
                                else {
                                    error = false;
                                    res.send({
                                        token,
                                        errorCode: false,
                                        user: userNoPassword
                                    })
                                }
                            })
                        }
                        else {
                            res.send({
                                errorCode: "ERROR_LOGIN_CREDENTIALS"
                            })
                        }
                    }
                })
                if (notFound) {
                    res.send({
                        errorCode: "ERROR_LOGIN_CREDENTIALS"
                    })
                }
            })
        }
    });

    app.put('/username', verifyToken, (req, res) => {
        var User = mongoose.model('User', UserSchema);

        jwt.verify(req.token, storedCredentials.jwt.secretkey, (err, authData) => {
            if (err) {
                res.send({
                    errorCode: "TOKEN_INVALID"
                })
            }
            else {
                // checking for expiration
                if (authData['iat'] >= authData['exp']) {
                    // console.log('token expired!');
                }
                else {
                    if (req.body.toVerify) {
                        const formusername = req.body.username;
                        User.find({username: formusername} , (err, users) => {
                            if(err) {
                                console.log(err);
                                res.send({
                                    errorCode: "ERROR"
                                })
                                return;
                            }
                            if (users.length == 0) {
                                res.send({
                                    errorCode: false,
                                    isValid: true
                                })
                            }
                            else {
                                res.send({
                                    errorCode: "NAME_TAKEN",
                                    isValid: false
                                })
                            }
                        });
                    }
                    else {
                        // locate player
                        // save username
                        // return ok with passwordless user
                        console.log('well well well');
                        
                        const jwtemail = authData.user.email;
                        const formusername = req.body.username;
                        if (jwtemail) {
                            User.find({email: jwtemail} , (err, users) => {
                                if(err) {
                                    console.log(err);
                                    res.send({
                                        errorCode: "ERROR"
                                    })
                                    return;
                                }
                                console.log('users', users.length);
                                
                                if (users.length === 1) {
                                    const user = users[0];
                                    user.username = formusername;
                                    user.save();
                                    
                                    const userNoPassword = {
                                        username: user.username,
                                        color: user.color,
                                        createdAt: user.createdAt,
                                        decks: user.decks,
                                        email: user.email,
                                        isActive: user.isActive,
                                        profile_picture: user.profile_picture,
                                        id: user._id
                                    };

                                    error = false;

                                    res.send({
                                        user: userNoPassword
                                    })
                                }
                                else {
                                    res.send({
                                        errorCode: "USER_NOT_FOUND"
                                    })
                                }
                            });
                        }
                    }
                }
            }
        });
    });

    // app.put('/username', verifyToken, (req, res) => {
    //     var User = mongoose.model('User', UserSchema);
    //     var notFound = true;

    //     jwt.verify(req.token, storedCredentials.jwt.secretkey, (err, authData) => {
    //         if (err) {
    //             res.send({
    //                 errorCode: "TOKEN_INVALID"
    //             })
    //         }
    //         else {

    //             // checking for expiration
    //             if (authData['iat'] >= authData['exp']) {
    //                 // console.log('token expired!');
    //             }
    //             else {
    //                 // console.log('token not expired yet');
    //                 const email = authData.user.email;
    //                 const username = req.body.username;

    //                 if (email) {
    //                     // go fetch the user
    //                     // console.log('found an email in the token', email);

    //                     User.find({} , (err, users) => {
    //                         if(err) {
    //                             console.log(err);
    //                             res.send({
    //                                 errorCode: "ERROR_LOGIN"
    //                             })
    //                             return;
    //                         }
    //                         users.map(user => {
    //                             if (user.email === email) {
    //                                 notFound = false;
    //                                 // Alternatively, we could send the entire object, minus the password, without surgically selecting each field
    //                                 const userNoPassword = {
    //                                     color: user.color,
    //                                     createdAt: user.createdAt,
    //                                     decks: user.decks,
    //                                     email: user.email,
    //                                     isActive: user.isActive,
    //                                     profile_picture: user.profile_picture,
    //                                     id: user._id
    //                                 };

    //                                 res.send({
    //                                     errorCode: false,
    //                                     user: userNoPassword
    //                                 })
    //                             }
    //                         })
    //                         if (notFound) {
    //                             res.send({
    //                                 errorCode: "ERROR_LOGIN_CREDENTIALS"
    //                             })
    //                         }
    //                     });
    //                 }
    //             }


    //             // res.send({
    //             //     errorCode: false,
    //             //     authData
    //             // })
    //         }
    //     });
    // });

    app.put('/user', verifyToken, (req, res) => {
        jwt.verify(req.token, storedCredentials.jwt.secretkey, (err, authData) => {
            if (err) {
                res.send({
                    errorCode: "TOKEN_INVALID"
                })
            }
            else {
                res.send({
                    errorCode: false,
                    authData
                })
            }
        });
    });

    // Format of token
    // Authorization: Bearer <access_token>

    // Verify Token
    function verifyToken(req, res, next) {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // Get Token from array
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            // Next middleware
            next();
        }
        else {
            // res.redirect('http://localhost:8080/login')
            // res.sendStatus(403);
            res.send({
                errorCode: "TOKEN_INVALID at verification"
            })
        }
    }
    
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})
