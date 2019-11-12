<template>
  <div id="app" class="flex bg-lition-background">
    <nav v-if="ethereum && ethereum.getNetworkName() !== 'main'" class="h-screen bg-lition-black text-md overflow-y-auto pb-10" style="min-width: 300px">
      <div class="flex items-center pl-8 bg-lition-black-nav">
        <router-link :to="{ name: 'welcome' }"><img src="lition-logo.png" alt="Lition Logo"></router-link>
      </div>
      <ul class="mt-8 text-white ml-8">
        <li>
          <NavigationRouteLink route="register.network" active-on-segment="register">{{ $t('nav.register_new_chain') }}</NavigationRouteLink>
        </li>
        <li class="mt-4">
          <NavigationRouteLink route="interact.provide_sidechain_id" active-on-segment="interact">{{ $t('nav.interact_with_chain') }}</NavigationRouteLink>
        </li>
        <li class="mt-4">
          <a href="https://lition.io" target="_blank">Vest without running a node</a>
        </li>
        <li class="mt-4">
          <a :href="smartContractLink" target="_blank">Advanced section</a>
        </li>
      </ul>
      <div class="w-full mt-8" style="background-color: #1A263C; height: 0.2rem"></div>
      <RegisterSteps v-if="isRegistering"></RegisterSteps>
      <InteractionSideMenu v-if="isInteracting"></InteractionSideMenu>
      <Details v-if="hasChainId"></Details>
    </nav>
    <main class="flex items-center justify-center w-full overflow-y-auto">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavigationRouteLink from './components/NavigationRouteLink'
import RegisterSteps from './views/RegisterSideChain/RegisterSteps'
import InteractionSideMenu from './views/InteractWithSideChain/InteractionSideMenu'
import { etherScanAddress, getLitionRegistryAddress } from './utils'
import Details from './components/Details'
import { mapGetters } from 'vuex'

export default {
  inject: ['ethereum'],
  components: { NavigationRouteLink, RegisterSteps, InteractionSideMenu, Details },
  created () {
    this.$store.dispatch('setNetwork', this.ethereum.getNetworkName())
  },
  computed: {
    ...mapGetters([
      'network'
    ]),
    isRegistering () {
      if (!Object.prototype.hasOwnProperty.call(this.$route, 'name')) {
        return false
      }

      return this.$route.name.indexOf('register') !== -1
    },
    isInteracting () {
      if (!Object.prototype.hasOwnProperty.call(this.$route, 'name')) {
        return false
      }

      return this.$route.name.indexOf('interact') !== -1
    },
    smartContractLink () {
      return etherScanAddress(this.network, getLitionRegistryAddress(this.network))
    },
    hasChainId () {
      if (!Object.prototype.hasOwnProperty.call(this.$route, 'params')) {
        return false
      }

      if (!Object.prototype.hasOwnProperty.call(this.$route.params, 'chain')) {
        return false
      }

      return this.$route.params.chain
    }
  }
}
</script>
