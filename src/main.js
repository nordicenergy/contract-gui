import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Web3 from 'web3'
import { getAbi } from './Abi'
import { getBalance } from './Ethereum'
Vue.config.productionTip = false

// getBalance('0xdE2053846709Fb10235Cfde552DD03e41F64d37a')
//   .then(eth => {
//     console.log(eth)
//   })

const url = 'https://ropsten.infura.io/v3/f6a9663ab5ab4c808b6e7260f213141f'
const web3 = new Web3(url)

const abi = getAbi()
const smartContractAddress = '0x13BC9D19d886189d0EA12257b2B1B13A77506F94'

const contract = new web3.eth.Contract(abi, smartContractAddress)
contract.methods.get_last_notary(0).call((err, result) => {
  console.log(result)
})
