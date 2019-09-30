<template>
  <div class="flex flex-col pl-8">
    <router-link :class="changeChainIdActive" :to="{ name: 'interact.provide_sidechain_id' }" class="inline-block text-md mt-8">Change chain id</router-link>
    <div class="flex flex-col" v-if="chain">
      <router-link :class="vestingActiveClass" :to="{ name: 'interact.vesting', params: { chain: chain } }" class="inline-block text-md mt-8">{{ $t('interaction_menu.vesting') }}</router-link>
      <router-link :to="{ name: 'interact.vest_in_chain', params: { chain: chain } }" class="inline-block text-md text-lition-gray mt-4">{{ $t('interaction_menu.vest_in_chain') }}</router-link>
      <router-link :to="{ name: 'interact.withdraw_vesting', params: { chain: chain } }" class="inline-block text-md text-lition-gray mt-4">{{ $t('interaction_menu.withdraw_vesting') }}</router-link>
      <router-link :to="{ name: 'interact.confirm_vest', params: { chain: chain } }" class="inline-block text-md text-lition-gray mt-4">{{ $t('interaction_menu.confirm_vest') }}</router-link>
      <router-link :class="depositsActiveClass" :to="{ name: 'interact.deposits', params: { chain: chain } }" class="inline-block text-md text-white mt-8">{{ $t('interaction_menu.deposits') }}</router-link>
      <router-link :to="{ name: 'interact.deposit_in_chain', params: { chain: chain } }" class="inline-block text-md text-lition-gray mt-4">{{ $t('interaction_menu.deposit_in_chain') }}</router-link>
      <router-link :to="{ name: 'interact.withdraw_deposit', params: { chain: chain } }" class="inline-block text-md text-lition-gray mt-4">{{ $t('interaction_menu.withdraw_deposit') }}</router-link>
      <router-link :to="{ name: 'interact.confirm_deposit_withdrawal', params: { chain: chain } }" class="inline-block text-md text-lition-gray mt-4">{{ $t('interaction_menu.confirm_deposit_withdrawal') }}</router-link>
      <router-link :class="miningActiveClass" :to="{ name: 'interact.mining', params: { chain: chain } }" class="inline-block text-md text-white mt-8">{{ $t('interaction_menu.mining') }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    chain () {
      if (!Object.prototype.hasOwnProperty.call(this.$route, 'params')) {
        return false
      }

      if (!Object.prototype.hasOwnProperty.call(this.$route.params, 'chain')) {
        return false
      }

      return this.$route.params.chain
    },
    vestingActiveClass () {
      return this.isOneOfRoutes(['interact.vesting', 'interact.vest_in_chain', 'interact.withdraw_vesting', 'interact.confirm_vest']) ? 'text-sidebar-active' : 'text-white'
    },
    depositsActiveClass () {
      return this.isOneOfRoutes(['interact.deposits', 'interact.deposit_in_chain', 'interact.withdraw_deposit', 'interact.confirm_deposit_withdrawal']) ? 'text-sidebar-active' : 'text-white'
    },
    miningActiveClass () {
      return this.isOneOfRoutes(['interact.mining']) ? 'text-sidebar-active' : 'text-white'
    },
    changeChainIdActive () {
      return this.isOneOfRoutes(['interact.provide_sidechain_id']) ? 'text-sidebar-active' : 'text-white'
    }
  },
  methods: {
    isOneOfRoutes (routes) {
      if (!Object.prototype.hasOwnProperty.call(this.$route, 'params')) {
        return false
      }

      const routeName = this.$route.name

      return routes.indexOf(routeName) !== -1
    }
  }
}
</script>
