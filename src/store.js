import Vue from 'vue'
import Vuex from 'vuex'
import { MINT, APPROVE, REGISTER, VEST, CONFIRM_VEST_INCREASE, DEPOSIT } from './transactionTypes'
import config from './config'
import VuexPersistance from 'vuex-persist'

const vuexLocal = new VuexPersistance({
  key: `lition-sidechain-manager_v_${config.version}`,
  storage: window.localStorage
})

Vue.use(Vuex)

const SET_NETWORK = 'set_network'
const SET_APPROVAL = 'set_approval'
const SET_VEST_IN_CHAIN = 'set_vest_in_chain'
const SET_CONFIRM_VEST_INCREASE = 'set_confirm_vest_increase'
const SET_DEPOSIT_IN_CHAIN = 'set_deposit_in_chain'
const ADD_MINT = 'add_mint'
const ADD_TRANSACTION = 'add_transaction'
const ADD_REGISTRATION = 'add_registration'

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    network: null,
    transactions: [],
    mints: [],
    lastApproval: null,
    lastVestInChain: null,
    lastVestIncreaseInChain: null,
    lastDepositInChain: null,
    registrations: []
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
    [SET_APPROVAL] (state, transaction) {
      state.lastApproval = transaction
    },
    [ADD_REGISTRATION] (state, transaction) {
      state.registrations.push(transaction)
    },
    [SET_VEST_IN_CHAIN] (state, transaction) {
      state.lastVestInChain = transaction
    },
    [SET_CONFIRM_VEST_INCREASE] (state, transaction) {
      state.lastVestIncreaseInChain = transaction
    },
    [SET_DEPOSIT_IN_CHAIN] (state, transaction) {
      state.lastDepositInChain = transaction
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
      commit(SET_APPROVAL, approval)
      commit(ADD_TRANSACTION, {
        type: APPROVE,
        transaction: approval
      })
    },
    addRegistration ({ commit }, registration) {
      commit(ADD_REGISTRATION, registration)
      commit(ADD_TRANSACTION, {
        type: REGISTER,
        transaction: registration
      })
    },
    setVestInChain ({ commit }, vestInChain) {
      commit(SET_VEST_IN_CHAIN, vestInChain)
      commit(ADD_TRANSACTION, {
        type: VEST,
        transaction: vestInChain
      })
    },
    setConfirmVestIncreaseInChain ({ commit }, confirmVestIncreaseInChain) {
      commit(SET_CONFIRM_VEST_INCREASE, confirmVestIncreaseInChain)
      commit(ADD_TRANSACTION, {
        type: CONFIRM_VEST_INCREASE,
        transaction: confirmVestIncreaseInChain
      })
    },
    setDeposit ({ commit }, deposit) {
      commit(SET_DEPOSIT_IN_CHAIN, deposit)
      commit(ADD_TRANSACTION, {
        type: DEPOSIT,
        transaction: deposit
      })
    }
  },
  getters: {
    network: state => state.network,
    mints: state => state.mints,
    lastApproval: state => state.lastApproval,
    lastVestInChain: state => state.lastVestInChain,
    lastVestIncreaseInChain: state => state.lastVestIncreaseInChain,
    lastDepositInChain: state => state.lastDepositInChain,
    registrations: state => state.registrations
  }
})
