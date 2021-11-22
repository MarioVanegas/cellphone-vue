import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    marcas: [
      "Xiaomi",
      "Huawei",
      "Samsumg",
      "Apple",
      "Nokia",
      "Google",
      "LG",
      "Motorola",
      "Oppo",
      "Otro",
    ],
    so: [{
        tipo: "Android",
        version: [4, 5, 6, 7, 8, 9, 10, 11]
      },
      {
        tipo: "IOS",
        version: [3, 4, 5, 6, 7, 8, 10, 12, 13, 14]
      },
    ],
    ram: [1, 2, 3, 4, 6, 8, 12],
    rom: [16, 32, 64, 128, 256, 512],
  },
  mutations: {
    nuevoAnuncio(state) {
      state.nuevo = !state.nuevo;
    },
  },
  actions: {},
  modules: {}
});