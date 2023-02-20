import { createStore } from 'vuex'
import kamekaApi from '@/api/KamekaApi'

export default createStore({
  state: {
    rooms: [],
    tariffs: [],
    services: [],
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
          for (let i = 0; i < data.length; i++) {
            const room = data[i];
            if (i === 0) {
              room.color = 'red'
            } else if (i === 1) {
              room.color = 'yellow'
            } else if (i === 2) {
              room.color = 'blue'
            } else if (i === 3) {
              room.color = 'rgb(255,255,0)'
            } else if (i === 4) {
              room.color = 'rgb(0,255,255)'
            } else if (i === 5) {
              room.color = 'rgb(255,175,175)'
            } else if (i === 6) {
              room.color = 'rgb(175,175,175)'
            } else if (i === 7) {

            }
          }
          commit('SET_DATA_ON_STATE', { rooms: data })
        })
    },
    GET_TARIFFS({ commit }) {
      kamekaApi.getTarrifs()
        .then(data => {
          commit('SET_DATA_ON_STATE', { tariffs: data })
        })
    },
    GET_SERVICES({ commit }) {
      kamekaApi.getServices()
        .then(data => {
          commit('SET_DATA_ON_STATE', { services: data })
        })
    },
  },
  modules: {
  }
})
