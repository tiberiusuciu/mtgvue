import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

import axios from 'axios'
const bcrypt = require('bcryptjs')

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
      errorCode: false
    },
    token: {},
    cardResults: [],
    viewingCard: null
  },
  mutations: {
    toggleMenu (state) {
      state.showMenu = !state.showMenu
    },
    addCardToHand (state, { card, isOpponent }) {
      if (!isOpponent) {
        state.game.player.hand.push(card)
      }
    },
    requestToServer (state, requests) {
      state.requests = requests
    },
    userHasLoggedIn (state, { token, user }) {
      state.token = token
      state.user = user
    },
    applyUser (state, user) {
      state.user = user
    },
    applyToken (state, token) {
      state.token = token
    },
    filteredCards (state, cards) {
      console.log('assigning', cards.length)

      state.cardResults = cards
    },
    cardSearchViewCard (state, card) {
      state.viewingCard = card
    }
  },
  actions: {
    onToggleMenu ({ commit }) {
      commit('toggleMenu')
    },
    onAddCardToHand ({ commit }, card, isOpponent) {
      commit('addCardToHand', card, isOpponent)
    },
    onGetRandomCard ({ commit }, isOpponent) {
      axios.get('http://localhost:3000/randomcard')
        .then(res => {
          commit('addCardToHand', { card: res.data, isOpponent })
        })
        .catch(error => console.log(error))
    },
    onCreateUser ({ commit }, formdata) {
      commit('requestToServer', {
        requestSent: true,
        isLoading: true,
        errorCode: false
      })

      // salt the password first!
      var salt = bcrypt.genSaltSync(10)
      var hash = bcrypt.hashSync(formdata.password.value, salt)

      axios.post('http://localhost:3000/user', {
        email: formdata.email.value,
        // username: formdata.username.value,
        password: hash
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          // show a popup or something to confirm user creation
          commit('requestToServer', {
            requestSent: true,
            isLoading: false,
            errorCode: res.data.errorCode
          })
        })
        .catch(error => console.log(error))
    },
    clearPostRequestMessage ({ commit }) {
      commit('requestToServer', {
        requestSent: false,
        isLoading: false,
        errorCode: false
      })
    },
    onLogin ({ commit }, formdata) {
      commit('requestToServer', {
        requestSent: true,
        isLoading: true,
        errorCode: false
      })

      axios.post('http://localhost:3000/login', {
        email: formdata.email,
        password: formdata.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (!res.data.errorCode) {
            commit('requestToServer', {
              requestSent: false,
              isLoading: false,
              errorCode: res.data.errorCode
            })
            commit('userHasLoggedIn', { token: res.data.token, user: res.data.user })

            console.log('token', res.data.token)
            console.log('user', res.data.user)

            var userString = JSON.stringify(res.data.user)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', userString)
            router.push('/')
          } else {
            commit('requestToServer', {
              requestSent: true,
              isLoading: false,
              errorCode: res.data.errorCode
            })
          }
        })
        .catch(error => console.log(error))
    },
    tryAutoLogin ({ commit }) {
      console.log('autolog')

      const user = JSON.parse(localStorage.getItem('user'))
      commit('applyUser', user)

      const token = localStorage.getItem('token')
      if (!token) {
        console.log('no token found')
        return
      }

      commit('requestToServer', {
        requestSent: true,
        isLoading: true,
        errorCode: false
      })

      // if token found, go get user from api
      axios.post('http://localhost:3000/login', {
        token
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (!res.data.errorCode) {
            commit('requestToServer', {
              requestSent: false,
              isLoading: false,
              errorCode: res.data.errorCode
            })
            commit('userHasLoggedIn', { user: res.data.user, token })

            var userString = JSON.stringify(res.data.user)
            localStorage.setItem('user', userString)
            if (res.data.user.username) {
              router.push('/')
            } else {
              router.push('/username')
            }
          } else {
            commit('requestToServer', {
              requestSent: true,
              isLoading: false,
              errorCode: res.data.errorCode
            })
          }
        })
        .catch(error => console.log(error))
    },
    onSubmitUsername ({ commit, state }, data) {
      commit('requestToServer', {
        requestSent: true,
        isLoading: true,
        errorCode: false
      })
      axios.put('http://localhost:3000/username', { username: data.username, toVerify: data.toVerify }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.token
        }
      }).then(res => {
        // show a popup or something to confirm user creation
        console.log('res', res.data)
        commit('requestToServer', {
          requestSent: true,
          isLoading: false,
          errorCode: res.data.errorCode
        })
        console.log('did it work?', data.toVerify)

        if (data.toVerify === false) {
          console.log('new user updaet', res.data.user)

          var userString = JSON.stringify(res.data.user)
          localStorage.setItem('user', userString)
          commit('applyUser', res.data.user)
        }
      })
        .catch(error => console.log(error))
    },
    onUserUpdate ({ commit, state }) {
      axios.put('http://localhost:3000/user', {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.token
        }
      }).then(res => {
        // show a popup or something to confirm user creation
        console.log('res', res.data)
      }).catch(error => console.log(error))
    },
    clearRequest ({ commit }) {
      commit('requestToServer', {
        requestSent: false,
        isLoading: false,
        errorCode: false
      })
    },
    logout ({ commit }) {
      commit('requestToServer', {
        requestSent: false,
        isLoading: false,
        errorCode: false
      })
      commit('applyUser', null)
      commit('applyToken', {
        token: null
      })
      localStorage.clear()
      router.push('/login')
    },
    getCards ({ commit }, filter) {
      axios.get('http://localhost:3000/cards', {
        params: {
          filter
        }
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        // show a popup or something to confirm user creation
        // console.log('res', res.data);
        commit('filteredCards', res.data)
      }).catch(error => console.log(error))
    },
    getCard ({ commit }, id) {
      axios.get('http://localhost:3000/card', {
        params: {
          id
        }
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        // show a popup or something to confirm user creation
        console.log('res', res.data)
        commit('cardSearchViewCard', res.data)
      }).catch(error => console.log(error))
    }
  },
  getters: {
    showMenu (state) {
      return state.showMenu
    },
    user (state) {
      return state.user
    },
    game (state) {
      return state.game
    },
    requests (state) {
      return state.requests
    },
    token (state) {
      return state.token
    },
    cardResults (state) {
      return state.cardResults
    },
    viewingCard (state) {
      return state.viewingCard
    }
  }
})
