import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';
const bcrypt = require('bcryptjs');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showMenu: false,
    user: {},
    game: {
      player: {
        health: 20,
        hand: []
      },
      opponents: [],
      chat: [],
      spectators: []
    }
  },
  mutations: {
    toggleMenu (state) {
      state.showMenu = !state.showMenu
    },
    addCardToHand (state, { card, isOpponent }) {
      if(!isOpponent) {
        state.game.player.hand.push(card)
      }
    }
  },
  actions: {
    onToggleMenu({commit}) {
      commit('toggleMenu');
    },
    onAddCardToHand ({commit}, card, isOpponent) {
      commit('addCardToHand', card, isOpponent);
    },
    onGetRandomCard ({commit}, isOpponent) {
      axios.get('http://localhost:3000/randomcard')
        .then(res => {
          commit('addCardToHand', {card: res.data, isOpponent})
        })
        .catch(error => console.log(error))
    },
    onCreateUser ({commit}, formdata) {
      // salt the password first!
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(formdata.password.value, salt);

      axios.post('http://localhost:3000/user', {
        email: formdata.email.value,
        // username: formdata.username.value,
        password: hash
      }, { 
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'blob'
      })
        .then(res => {
          // commit('addCardToHand', {card: res.data, isOpponent})
          // show a popup or something to confirm user creation
          console.log('User has been created');
          
        })
        .catch(error => console.log(error))
    }
  },
  getters: {
    showMenu (state) {
      return state.showMenu;
    },
    user (state) {
      return state.user;
    },
    game (state) {
      return state.game;
    },
  }
})