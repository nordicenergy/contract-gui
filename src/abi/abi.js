import ropstenErc20Abi from './ropsten/ERC20.json'
import ropstenLitionRegistryAbi from './ropsten/LitionRegistry.json'
import mainErc20Abi from './main/ERC20.json'
import mainLitionRegistryAbi from './main/LitionRegistry.json'

export const getErc20Abi = (network = 'ropsten') => {
  if (network === 'main') {
    return mainErc20Abi
  } else if (network === 'ropsten') {
    return ropstenErc20Abi
  }
}

export const getLitionRegistryAbi = (network = 'ropsten') => {
  if (network === 'main') {
    return mainLitionRegistryAbi
  } else if (network === 'ropsten') {
    return ropstenLitionRegistryAbi
  }
}
