<template>
  <div class="flex flex-col pl-8" v-if="chain">
    <router-link :to="{ name: 'interact.vesting', params: { chain: chain } }" class="inline-block text-md text-white mt-8">{{ $t('interaction_menu.vesting') }}</router-link>
    <router-link :to="{ name: 'interact.vest_in_chain', params: { chain: chain } }" class="inline-block text-md text-lition-gray mt-4">{{ $t('interaction_menu.vest_in_chain') }}</router-link>
    <router-link :to="{ name: 'interact.withdraw_vesting', params: { chain: chain } }" class="inline-block text-md text-lition-gray mt-4">{{ $t('interaction_menu.withdraw_vesting') }}</router-link>
    <router-link :to="{ name: 'interact.confirm_vest_increase', params: { chain: chain } }" class="inline-block text-md text-lition-gray mt-4">{{ $t('interaction_menu.confirm_vest_increase') }}</router-link>
    <router-link :to="{ name: 'interact.deposits', params: { chain: chain } }" class="inline-block text-md text-white mt-8">{{ $t('interaction_menu.deposits') }}</router-link>
    <router-link :to="{ name: 'interact.deposit_in_chain', params: { chain: chain } }" class="inline-block text-md text-lition-gray mt-4">{{ $t('interaction_menu.deposit_in_chain') }}</router-link>
    <router-link :to="{ name: 'interact.withdraw_deposit', params: { chain: chain } }" class="inline-block text-md text-lition-gray mt-4">{{ $t('interaction_menu.withdraw_deposit') }}</router-link>
    <router-link :to="{ name: 'interact.confirm_deposit_withdrawal', params: { chain: chain } }" class="inline-block text-md text-lition-gray mt-4">{{ $t('interaction_menu.confirm_deposit_withdrawal') }}</router-link>
    <router-link :to="{ name: 'interact.mining', params: { chain: chain } }" class="inline-block text-md text-white mt-8">{{ $t('interaction_menu.mining') }}</router-link>
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
    }
  }
}
</script>
