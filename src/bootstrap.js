import Ethereum from './Ethereum'

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      const ethereum = Ethereum(window.ethereum, window.web3)
      resolve(ethereum)
    } catch (e) {
      reject(e)
    }
  })
}
