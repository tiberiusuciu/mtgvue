import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';
const bcrypt = require('bcryptjs');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showMenu: false,
    user: null,
    game: {
      player: {
        health: 20,
        hand: []
      },
      opponents: [],
      chat: [],
      spectators: []
    },
    requests: {
      requestSent: false,
      isLoading: false,
      errorCode: ""
    },
    token: {}
  },
  mutations: {
    toggleMenu (state) {
      state.showMenu = !state.showMenu
    },
    addCardToHand (state, { card, isOpponent }) {
      if(!isOpponent) {
        state.game.player.hand.push(card)
      }
    },
    requestToServer (state, requests) {
      state.requests = requests
    },
    userHasLoggedIn (state, { token, user }) {
      state.token = token;
      state.user = user;
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
      commit('requestToServer', {
        requestSent: true,
        isLoading: true,
        errorCode: false
      });

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
        }
      })
        .then(res => {
          // show a popup or something to confirm user creation
          commit('requestToServer', {
            requestSent: true,
            isLoading: false,
            errorCode: res.data.errorCode
          });
          
        })
        .catch(error => console.log(error))
    },
    clearPostRequestMessage ({commit}) {
      commit('requestToServer', {
        requestSent: false,
        isLoading: false,
        errorCode: false
      });
    },
    onLogin ({commit}, formdata) {
      commit('requestToServer', {
        requestSent: true,
        isLoading: true,
        errorCode: false
      });

      // salt the password first!
      // var salt = bcrypt.genSaltSync(10);
      // var hash = bcrypt.hashSync(formdata.password, salt);

      axios.post('http://localhost:3000/login', {
        email: formdata.email,
        password: formdata.password
        // password: hash
      }, { 
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(res => {
          // show a popup or something to confirm user creation
          console.log('res', res.data);

          commit('requestToServer', {
            requestSent: true,
            isLoading: false,
            errorCode: res.data.errorCode
          });
          if (!res.data.errorCode) {
            commit('userHasLoggedIn', { token: res.data.token, user: res.data.user });
          }
        })
        .catch(error => console.log(error))
    },
    onUserUpdate({commit, state }) {
      axios.put('http://localhost:3000/user', {}, { 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.token
        }
      }).then(res => {
        // show a popup or something to confirm user creation
        console.log('res', res.data);
        
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
    requests (state) {
      return state.requests
    },
    token (state) {
      return state.token
    }
  }
})