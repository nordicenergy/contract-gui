import Web3 from 'web3'

export const tokensToHex = (tokens) => {
  let BN = Web3.utils.BN
  let bigNumberTokens = new BN('1000000000000000000').mul(new BN(tokens))
  return Web3.utils.toHex(bigNumberTokens)
}
