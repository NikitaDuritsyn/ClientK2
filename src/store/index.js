import { createStore } from 'vuex'
import kamekaApi from '@/api/KamekaApi'

export default createStore({
  state: {
    rooms: [],
    tariffs: [],
    services: []
  },
  getters: {},
  mutations: {
    SET_DATA_ON_STATE(state, data) {
      for (let key in data) {
        state[key] = data[key]
      }
    }
  },
  actions: {
    GET_ROOMS({ commit }) {
      kamekaApi.getRooms()
        .then(data => {
          // console.log(data);
          commit('SET_DATA_ON_STATE', { rooms: data })
        })
    },
    GET_TARIFFS({ commit }) {
      kamekaApi.getTarrifs()
        .then(data => {
          console.log(data);
          commit('SET_DATA_ON_STATE', { tariffs: data })
        })
    },
    GET_SERVICES({ commit }) {
      kamekaApi.getServices()
        .then(data => {
          console.log(data);
          commit('SET_DATA_ON_STATE', { services: data })
        })
    },
  },
  modules: {
  }
})
