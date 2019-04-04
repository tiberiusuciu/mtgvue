<template>
  <div id="app">

    <div class="button" @click="addCard()">
      Card
    </div>
    <div class="hand">
      <template v-for="(card, index) in this.game.player.hand">
        <Card :card='card' :cardId="index" :key="index" @mousedown="mouseIsPressed()"></Card>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Card from '../components/Card.vue'

export default {
  name: 'app',
  components: {
    Card
  },
  methods: {
    addCard () {
      this.$store.dispatch('onGetRandomCard', false);
    },
    mouseIsPressed () {
      console.log('we pressing!')
    }
  },
  computed: {
    game() {
      return this.$store.getters.game
    }
  },
}
</script>

<style>
* {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
body {
  margin: 0px;
  padding: 0px;
  background-color: ghostwhite;
  overflow-y: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.hand {
  position: absolute;
  /* bottom: -136px; */
  /* background-color: aquamarine; */
  width: 100%;
  display: inline-block;
  margin: auto;
  text-align: center;
  bottom: 0px;
  /* margin: 0px 200px; */
  /* padding: 0px 300px; */
  /* height: 400px; */
  /* You could make a script that repositions hand according to mouse position */
  /* In mobile, remove hand, place it on the side */
  /* overflow-x: scroll; */
  /* height: 500px; */
  /* width: max-content; */
  /* padding: 0px 100px; */
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}
.button {
  width: 100px;
  height: 50px;
  background-color: dodgerblue;
  text-align: center;
  line-height: 50px;
  font-weight: bold;
  border-radius: 5px;
  color: white;
  /* border-bottom: 5px solid dodgerblue; */
  transition: background-color .15s ease-in-out;
  margin: auto;
  margin-top: 300px;
  cursor: pointer;
}
.button:hover {
  background-color: lightgreen;
}
</style>
