import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    modulea: {
      state: {
        count: 1
      },
      mutations: {
        increment: state => {
          state.count++
        }
      },
      getters: {
        getLength: state => {
          return state.length
        }
      }
    }
  }
})
