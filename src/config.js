export default {
  version: process.env.VUE_APP_VERSION || '0.0.1',
  locale: process.env.VUE_APP_LOCALE || 'en',
  litionErc20TokenContractAddress: process.env.VUE_APP_SC_ERC20_ADDRESS || '0x65fc0f7d2bb96a9be30a770fb5fcd5a7762ad659',
  litionRegistryContractAddress: process.env.VUE_APP_SC_LITION_REGISTRY_ADDRESS || '0xA20AF30b9eFafEAed4004188c7c835Ec48cCF31C',
  litionValidatorContractAddress: process.env.VUE_APP_SC_LITION_VALIDATOR_ADDRESS || '0xd5a1f09f0e7fb237847752a0f5748aeed07c917d'
}
