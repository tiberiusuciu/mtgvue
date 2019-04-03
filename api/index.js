const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors({credentials: true, origin: true}))
const port = 3000

const cardsJson = require('../AllSets.json');

app.get('/', (req, res) => {
    console.log("lel");
    
    res.send('Hello World!')
})
app.get('/getRandomCard', (req, res) => {
    // console.log("lel")
    // console.log(cardsJson);
    // console.log(cardsJson);
    
    // res.send(cardsJson)
    const keys = Object.keys(cardsJson)
    const key = keys[Math.floor(Math.random() * keys.length)]
    console.log(key);
    const cards = cardsJson[key].cards;
    const card = cards[Math.floor(Math.random() * cards.length)]
    console.log(card.name);
    const url = "https://img.scryfall.com/cards/large/en/" + key.toLowerCase() + "/" + card.number + ".jpg";
    res.send(url)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))