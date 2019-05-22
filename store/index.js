import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'

Vue.use(Vuex)

export const actions = {
  nuxtServerInit({ commit }, context) {
    console.log('Hello body')
  }
}

// const store = () => new Vuex.Store({
//   modules: {
//     geo,
//     // home
//   },
//   actions: {
//     nuxtServerInit({
//       commit
//     }, context) {
//       debugger;
//       console.log(123456)
//     }
//   }
// })

// export default store
// module.exports = store
