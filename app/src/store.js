import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';

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
      axios.get('http://localhost:3000/getRandomCard')
        .then(res => {
          commit('addCardToHand', {card: res.data, isOpponent})
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
