<template>
  <div>
    <div class="flex flex-col items-center">
      <span class="text-lition-gray text-sm font-medium">{{ $t('step') }} 1/4</span>
      <h1 class="font-lition text-3xl font-bold" v-html="$t('headline.register.network', { network: network }) "></h1>
      <p class="mt-2 text-lition-gray font-medium">{{ $t('subheadline.register.network') }}</p>
      <p class="mt-2 text-lition-gray font-medium" v-html="$t('subheadline.register.network_change')"></p>
    </div>
    <div class="mt-12 flex justify-between">
      <BackButton @click.native="previous">{{ $t('button.main_menu') }}</BackButton>
      <NextButton @click.native="next" :disabled="!validNetwork">{{ $t('button.mint_tokens') }}</NextButton>
    </div>
  </div>
</template>

<script>
import NextButton from '../../components/NextButton'
import BackButton from '../../components/BackButton'
import { mapGetters } from 'vuex'
import { isValidNetwork } from '../../utils'

export default {
  components: { NextButton, BackButton },
  computed: {
    ...mapGetters([
      'network'
    ]),
    validNetwork () {
      return isValidNetwork(this.network)
    }
  },
  methods: {
    previous () {
      this.$router.push({ name: 'welcome' })
    },
    next () {
      if (this.validNetwork) {
        this.$router.push({ name: 'register.mint_test_tokens', params: { network: this.network } })
      }
    }
  }
}
</script>
