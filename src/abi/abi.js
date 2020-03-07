import ropstenErc20Abi from './ropsten/ERC20.json'
import ropstenNordicEnergyRegistryAbi from './ropsten/NordicEnergyRegistry.json'
import mainErc20Abi from './main/ERC20.json'
import mainNordicEnergyRegistryAbi from './main/NordicEnergyRegistry.json'

export const getErc20Abi = (network = 'ropsten') => {
  if (network === 'main') {
    return mainErc20Abi
  } else if (network === 'ropsten') {
    return ropstenErc20Abi
  }
}

export const getNordicEnergyRegistryAbi = (network = 'ropsten') => {
  if (network === 'main') {
    return mainNordicEnergyRegistryAbi
  } else if (network === 'ropsten') {
    return ropstenNordicEnergyRegistryAbi
  }
}
