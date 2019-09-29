import Web3 from 'web3'

export const tokensToHex = (tokens) => {
  let BN = Web3.utils.BN
  let bigNumberTokens = new BN('1000000000000000000').mul(new BN(tokens))
  return Web3.utils.toHex(bigNumberTokens)
}

export const etherScanTransaction = (network, transactionHash) => {
  return `https://${network}.etherscan.io/tx/${transactionHash}`
}

export const etherScanAddress = (network, address) => {
  return `https://${network}.etherscan.io/address/${address}`
}

export const isNumeric = (number) => {
  return !isNaN(parseFloat(number)) && isFinite(number)
}

export const isValidNetwork = (network) => {
  const allowedNetworks = ['ropsten']

  return allowedNetworks.indexOf(network) !== -1
}
