import Web3 from 'web3'
import { getAbi, getSmartContractAddress } from './Abi'

const url = 'https://ropsten.infura.io/v3/f6a9663ab5ab4c808b6e7260f213141f'
const web3 = new Web3(url)

export const getBalance = async (address) => {
  const wei = await web3.eth.getBalance(address)
  return web3.utils.fromWei(wei, 'ether')
}

export const getLastNotary = async (chainId) => {
  const abi = getAbi()
  const contract = new web3.eth.Contract(abi, smartContractAddress)
  contract.methods.get_last_notary(0).call((err, result) => {
    console.log(result)
  })
}
