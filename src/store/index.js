import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import hotel from './modules/hotel'
import hotelManager from './modules/hotelManager'
import admin from './modules/admin'
import getters from './getters'
import {
  getResidentsAPI
} from '@/api/info'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    hotel,
    user,
    hotelManager,
    admin,
  },
  state: {
    residences :[]
  },
  mutations: {
    set_residences: function(state, data) {
      state.residences = data
    }
  },
  actions: {
    getResidences: async({ state, commit }) => {
      const res = await getResidentsAPI()
      if(res){
        commit('set_residences', res)
      }
    }
  },
  getters
})
