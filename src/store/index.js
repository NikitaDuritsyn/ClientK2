import { createStore } from 'vuex'
import kamekaApi from '@/api/KamekaApi'

export default createStore({
  state: {
    rooms: []
  },
  getters: {

  },
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
          console.log(data);
          commit('SET_DATA_ON_STATE', { rooms: data })
        })
    },
  },
  modules: {
  }
})
