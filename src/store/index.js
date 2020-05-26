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
    residences :[
      // {
      //   value: 'zhejiang',
      //   label: 'Zhejiang',
      //   children: [
      //     {
      //       value: 'hangzhou',
      //       label: 'Hangzhou',
      //       children: [
      //         {
      //           value: 'xihu',
      //           label: 'West Lake',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   value: 'jiangsu',
      //   label: 'Jiangsu',
      //   children: [
      //     {
      //       value: 'nanjing',
      //       label: 'Nanjing',
      //       children: [
      //         {
      //           value: 'zhonghuamen',
      //           label: 'Zhong Hua Men',
      //         },
      //       ],
      //     },
      //   ],
      // },
    ]
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
