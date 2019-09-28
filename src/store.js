import Vue from 'vue'
import Vuex from 'vuex'
import { MINT, APPROVE } from './transactionTypes'
import config from './config'
import VuexPersistance from 'vuex-persist'

const vuexLocal = new VuexPersistance({
  key: `lition-sidechain-manager_v_${config.version}`,
  storage: window.localStorage
})

Vue.use(Vuex)

const SET_NETWORK = 'set_network'
const ADD_MINT = 'add_mint'
const ADD_TRANSACTION = 'add_transaction'
const ADD_APPROVAL = 'add_approval'

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    network: null,
    transactions: [],
    mints: [],
    approvals: []
  },
  mutations: {
    [SET_NETWORK] (state, network) {
      state.network = network
    },
    [ADD_MINT] (state, mint) {
      state.mints.push(mint)
    },
    [ADD_TRANSACTION] (state, payload) {
      state.transactions.push({
        type: payload.type,
        transaction: payload.transaction
      })
    },
    [ADD_APPROVAL] (state, transaction) {
      state.approvals.push(transaction)
    }
  },
  actions: {
    setNetwork ({ commit }, network) {
      commit(SET_NETWORK, network)
    },
    addMint ({ commit }, mint) {
      commit(ADD_MINT, mint)
      commit(ADD_TRANSACTION, {
        type: MINT,
        transaction: mint
      })
    },
    addApproval ({ commit }, approval) {
      commit(ADD_APPROVAL, approval)
      commit(ADD_TRANSACTION, {
        type: APPROVE,
        transaction: approval
      })
    }
  },
  getters: {
    network: state => state.network,
    mints: state => state.mints,
    approvals: state => state.approvals
  }
})
