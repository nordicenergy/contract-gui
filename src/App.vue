<template>
  <div id="app" class="flex bg-lition-background">
    <nav class="h-screen bg-lition-black text-md" style="min-width: 300px">
      <div class="flex items-center pl-8 bg-lition-black-nav">
        <router-link :to="{ name: 'welcome' }"><img src="lition-logo.png" alt="Lition Logo"></router-link>
      </div>
      <ul class="mt-8 text-white ml-8">
        <li>
          <NavigationRouteLink route="register.network" active-on-segment="register">{{ $t('nav.register_new_chain') }}</NavigationRouteLink>
        </li>
        <li class="mt-4">
          <NavigationRouteLink route="interact.settings" active-on-segment="interact">{{ $t('nav.interact_with_chain') }}</NavigationRouteLink>
        </li>
        <li class="mt-4">
<!--          @TODO Add tutorial-->
          <a href="#tutorial" target="_blank">Vest without running a node</a>
        </li>
        <li class="mt-4">
          <!--          @TODO Add tutorial-->
          <a :href="smartContractLink" target="_blank">Advanced section</a>
        </li>
      </ul>
      <div class="w-full mt-8" style="background-color: #1A263C; height: 0.2rem"></div>
      <RegisterSteps v-if="isRegistering"></RegisterSteps>
      <InteractionSideMenu v-if="isInteracting"></InteractionSideMenu>
    </nav>
    <main class="flex w-full items-center justify-center">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavigationRouteLink from './components/NavigationRouteLink'
import RegisterSteps from './views/RegisterSideChain/RegisterSteps'
import InteractionSideMenu from './views/InteractWithSideChain/InteractionSideMenu'
import config from './config'
import { etherScanAddress } from './utils'

export default {
  components: { NavigationRouteLink, RegisterSteps, InteractionSideMenu },
  computed: {
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
      return etherScanAddress('ropsten', config.litionRegistryContractAddress)
    }
  }
}
</script>
