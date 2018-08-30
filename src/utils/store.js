// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: wx.getStorageSync('token')
  },
  mutations: {
    refreshToken (state, token) {
      state.token = token
      wx.setStorageSync('token', token)
    }
  },
  actions: {
    refreshToken ({commit}, token) {
      return new Promise(function (resolve, reject) {
        commit('refreshToken', token)
      })
    }
  }
})

export default store
