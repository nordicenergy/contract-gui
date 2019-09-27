import Vue from 'vue'
import Vuex from 'vuex'
import { MINT } from './transactionTypes'
import config from './config'
import VuexPersistance from 'vuex-persist'

const vuexLocal = new VuexPersistance({
  key: `lition-sidechain-manager_v_${config.version}`,
  storage: window.localStorage
})

Vue.use(Vuex)

const ADD_MINT = 'add_mint'
const ADD_TRANSACTION = 'add_transaction'

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    transactions: [],
    mints: []
  },
  mutations: {
    [ADD_MINT] (state, mint) {
      state.mints.push(mint)
    },
    [ADD_TRANSACTION] (state, transaction) {
      state.transactions.push({
        type: MINT,
        transaction: transaction
      })
    }
  },
  actions: {
    addMint ({ commit }, mint) {
      commit(ADD_TRANSACTION, mint)
      commit(ADD_MINT, mint)
    }
  },
  getters: {
    mints: state => state.mints
  }
})
