<template>
  <div id="app" class="flex bg-lition-background">
    <nav class="h-screen bg-lition-black text-md" style="min-width: 300px">
      <div class="flex items-center pl-8 bg-lition-black-nav">
        <router-link :to="{ name: 'welcome' }"><img src="lition-logo.png" alt="Lition Logo"></router-link>
      </div>
      <ul class="mt-4 text-white ml-8">
        <li>
          <NavigationRouteLink route="register.network" active-on-segment="register">{{ $t('nav.register_new_chain') }}</NavigationRouteLink>
        </li>
        <li class="mt-2">
          <NavigationRouteLink route="interact" active-on-segment="interact">{{ $t('nav.interact_with_chain') }}</NavigationRouteLink>
        </li>
      </ul>
      <div class="w-full mt-4" style="background-color: #1A263C; height: 0.2rem"></div>
      <RegisterSteps v-if="isRegistering"></RegisterSteps>
    </nav>
    <main class="flex w-full items-center justify-center">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavigationRouteLink from './components/NavigationRouteLink'
import RegisterSteps from './views/RegisterSideChain/RegisterSteps'

export default {
  components: { NavigationRouteLink, RegisterSteps },
  computed: {
    isRegistering () {
      return this.$route.name.indexOf('register') !== -1
    }
  }
}
</script>
