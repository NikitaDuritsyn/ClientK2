import { createStore } from 'vuex'
import kamekaApi from '@/api/KamekaApi'

export default createStore({
  state: {
    rooms: [],
    tariffs: [],
    services: [],
    roles: [],
    paymentTypes: [],
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
    GET_ROLES({ commit }) {
      kamekaApi.getRoles()
        .then(data => {
          commit('SET_DATA_ON_STATE', { roles: data })
        })
    },
    GET_ROOMS({ commit }) {
      kamekaApi.getRooms()
        .then(data => {
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
    GET_PAYMENTTYPES({ commit }) {
      kamekaApi.getPaymentTypes()
        .then(data => {
          commit('SET_DATA_ON_STATE', { paymentTypes: data })
        })
    },

  },
  modules: {
  }
})
