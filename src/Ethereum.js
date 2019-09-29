import LitionERC20Abi from './abi/ERC20'
import LitionRegistryAbi from './abi/LitionRegistry'
import config from './config'
import { tokensToHex } from './utils'
import Web3 from 'web3'

export default (ethereum, web3) => {
  if (typeof ethereum === 'undefined' || typeof web3 === 'undefined' || !Object.prototype.hasOwnProperty.call(web3, 'currentProvider')) {
    throw Error('No ethereum compatible client installed')
  }

  const _ethereum = ethereum
  const _currentProvider = web3.currentProvider
  let _erc20Contract
  let _litionRegistryContract
  let _web3
  let _account

  function initialize () {
    _web3 = new Web3(_currentProvider)
    _erc20Contract = new _web3.eth.Contract(LitionERC20Abi, config.litionErc20TokenContractAddress)
    _litionRegistryContract = new _web3.eth.Contract(LitionRegistryAbi, config.litionRegistryContractAddress)
  }

  initialize()

  return {
    hasMetaMask () {
      return _ethereum.isMetaMask
    },
    async login () {
      let accounts = await _ethereum.enable()

      if (accounts.length === 0) {
        throw Error('User has no MetaMask accounts')
      }

      _account = accounts[0]
    },
    async transactions () {
      // if (typeof _account === 'undefined') {
      //   await this.login()
      // }
      //
      // const count = await _web3.eth.getTransactionCount(_account)
      // let transactions = []
      // for (let i = 0; i < count; i++) {
      //   const block = await _web3.eth.getBlock(count - i)
      //   // transactions.push(block)
      //   // console.log(_web3.eth.getTransactionFromBlock(block.hash))
      //   transactions.push(_web3.eth.getTransactionFromBlock(block.hash))
      // }
      //
      // return Promise.all(transactions)
    },
    async getLastNotary (chainId) {
      return _litionRegistryContract
        .methods
        .getLastNotary(chainId)
        .call()
    },
    async mint (tokens) {
      if (typeof _account === 'undefined') {
        await this.login()
      }

      return _erc20Contract
        .methods
        .mint(_account, tokensToHex(tokens))
        .send({
          from: _account
        })
    },
    async approve (tokens) {
      if (typeof _account === 'undefined') {
        await this.login()
      }

      return _erc20Contract
        .methods
        .approve(config.litionRegistryContractAddress, tokensToHex(tokens))
        .send({
          from: _account
        })
    },
    async registerChain (
      description,
      initEndpoint,
      validatorAddress,
      vesting,
      maxNumberOfValidators,
      maxNumberOfTransactors,
      notaryVesting,
      notaryParticipation
    ) {
      if (typeof _account === 'undefined') {
        await this.login()
      }

      return _litionRegistryContract
        .methods
        .registerChain(
          description,
          initEndpoint,
          validatorAddress,
          tokensToHex(vesting),
          maxNumberOfValidators,
          maxNumberOfTransactors,
          notaryVesting,
          notaryParticipation
        )
        .send({
          from: _account
        })
    },
    async getChainStaticDetails (chainId) {
      if (typeof _account === 'undefined') {
        await this.login()
      }

      return _litionRegistryContract
        .methods
        .getChainStaticDetails(chainId)
        .call()
    }
  }
}
