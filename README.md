# MtgVue
Magic the Gathering app using VueJS + NodeJS

### Purpose
I want to synthesize the various technologies and methodologies that I have learned over the course of my professional and academic career. During my college days, I spent my breaks playing Magic the Gathering with friends and talked about the game. Due to its complexity, I figured I could use this game as my training grounds.

### Target goals
- Provide a magic UI that is clean and simple regardless of the device you are using
- Play a game of magic with as many players as you would like
- Create/Save/Load magic decks
- Add users as friends to chat and share decks
- Provide out of the box rules that let's you play format-specific games (commander, popper, standard, etc...) 
- Provide customizable game rules (make your own format)
- Simple game automation that keeps track and manages mana expenses and turn phases
- Advanced game automation that reads out cards and apply the required actions accordingly

### Tools
- Frontend
  - [VueJS](https://vuejs.org/) - An awesome javascript framework!
  - [Vuex](https://vuex.vuejs.org/) - State manager made simpler for large scale projects
  - [Vue Router](https://router.vuejs.org/) - Library for page navigation
  - [Vue CLI](https://cli.vuejs.org/) - An awesome tool to kickstart any project, regardless of the size
  - [Axios](https://github.com/axios/axios) - A library to execute promisified http requests
- Backend
  - [NodeJs](https://nodejs.org/en/) - Javascript Framework running in the backend as a server!
  - [Express](https://expressjs.com/) - HTTP utilities for the backend
  - [Mongoose](https://mongoosejs.com/) - ODM for my database
  - [cors](https://github.com/expressjs/cors#readme) - For simply making your life easier when testing locally
  - [Nodemon](https://nodemon.io/) - Tool for quick reloading upon file change on the backend;
- Database
  - [MongoDB](https://www.mongodb.com/) - NoSQL database
- Other
  - [MTGJSON](https://mtgjson.com/) - JSON object of remotely anything involving MTG

### Run it locally
You will need to have [MongoDB](https://www.mongodb.com/) installed on your computer
You will also need a copy of `AllSets.json` from [MTGJSON](https://mtgjson.com/downloads/compiled/)
Once you have the DB setup and you have downloaded the json file, open up a terminal and clone the repo
Time to get all the node modules requried for the project so head over to the root of the project and run the following
```sh
$ cd mtgvue/api
$ npm install
$ cd ../app
$ npm install
```

Now, we will need to populate the database in order to get cards.
I took the time to create some helper scripts in order to make the process a lot faster.
For starters, open up MongoDB in a terminal or with [Compass](https://www.mongodb.com/products/compass) and create a new database (I named mine **mtgdb**).
Also, Create a collection within **mtgdb** called **cards** (this is where all the cards of MTG will be stored)

Great, your DB is ready to populated! In a terminal, head over to the root of the project and run the following
```sh
$ cd mtgvue/api/helper
$ node mtgjson_makecarddb.js <relative path to your AllSets.json>
```
With that last command executed, your DB is ready! this script also adds a few extra fields to the existing JSON data in order to make my life easier hahaha!

Finally, we can launch the app and the server. Head over to the root of the project and execute these last few commands
```sh
$ cd mtgvue/app
$ npm run serve
```
Open up a new terminal, and execute the following
```sh
$ cd mtgvue/api
$ node index.js
```

License
----

MIT
