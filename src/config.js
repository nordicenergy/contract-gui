export default {
  locale: process.env.VUE_APP_LOCALE || 'en',
  litionErc20TokenContractAddress: process.env.VUE_APP_SC_ERC20_ADDRESS || '0x65fc0f7d2bb96a9be30a770fb5fcd5a7762ad659',
  litionRegistryContractAddress: process.env.VUE_APP_SC_LITION_REGISTRY_ADDRESS || '0xFdF20223c0b10f7281Fc00ef6Afc29aE2a9c043d',
  litionValidatorContractAddress: process.env.VUE_APP_SC_LITION_VALIDATOR_ADDRESS || '0x4946e4cF5DFc9f2715543167F0C420a839F9461a'
}
