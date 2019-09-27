<template>
  <div v-if="currentStep !== null">
    <span class="inline-block text-md text-white mt-4 ml-8">{{ $t('steps') }}</span>
    <ul class="mt-4 ml-8 w-48 text-md">
      <li class="flex items-center justify-between text-white">
        <span><router-link :to="{ name: 'register.network' }">{{ $t('register.steps.one') }}</router-link></span>
        <span v-show="currentStep > 1"><Check size="xs"></Check></span>
      </li>
      <li :class="{ 'text-white': currentStep >= 2, 'text-inactive': currentStep < 2 }"
          class="mt-2 flex items-center justify-between">
        <span v-if="network"><router-link :to="{ name: 'register.mint_test_tokens', params: { network: network } }">{{ $t('register.steps.two') }}</router-link></span>
        <span v-else>{{ $t('register.steps.two') }}</span>
        <span v-show="currentStep > 2"><Check size="xs"></Check></span>
      </li>
      <li :class="{ 'text-white': currentStep >= 3, 'text-inactive': currentStep < 3 }"
          class="mt-2 flex items-center justify-between">
        <span v-if="network"><router-link :to="{ name: 'register.approve_spender', params: { network: network } }">{{ $t('register.steps.three') }}</router-link></span>
        <span v-else>{{ $t('register.steps.three') }}</span>
        <span v-show="currentStep > 3"><Check size="xs"></Check></span>
      </li>
      <li :class="{ 'text-white': currentStep >= 4, 'text-inactive': currentStep < 4 }"
          class="mt-2 flex items-center justify-between">
        <span v-if="network"><router-link :to="{ name: 'register.new_chain', params: { network: network } }">{{ $t('register.steps.four') }}</router-link></span>
        <span v-else>{{ $t('register.steps.four') }}</span>
        <span v-show="currentStep > 4"><Check size="xs"></Check></span>
      </li>
    </ul>
  </div>
</template>

<script>
import Check from '../../components/Check'

export default {
  components: { Check },
  computed: {
    currentStep () {
      const currentRoute = this.$route.name
      const routeToStep = {
        'register.network': 1,
        'register.mint_test_tokens': 2,
        'register.approve_spender': 3,
        'register.new_chain': 4,
        'register.completed': 5
      }

      if (!Object.prototype.hasOwnProperty.call(routeToStep, currentRoute)) {
        return null
      }

      return routeToStep[currentRoute]
    },
    network () {
      const params = this.$route.params

      return params.network
    }
  }
}
</script>
