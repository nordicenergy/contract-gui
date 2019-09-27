<template>
  <div>
    <div class="flex flex-col items-center">
      <span class="text-lition-gray text-sm font-medium">{{ $t('step') }} 2/4</span>
      <h1 class="font-lition text-3xl font-bold">
        {{ $t('headline.mint.minted') }} <span class="text-active">{{ $t('headline.mint.lit') }}</span> {{
        $t('headline.mint.test_tokens') }}
      </h1>
      <div class="mt-6">
        <div class="mt-2" v-for="(mint, index) in mints" :key="index">
          <div class="flex items-center">
            <Check size="xxs"></Check>
            <p class="ml-4 text-md font-bold">{{ mint.tokens }} LIT tokens successfully minted on</p>
          </div>
          <p class="ml-8 text-md text-lition-gray">
            <a class="hover:text-secondary" :href="etherScan(mint.transaction)" target="_blank">{{ mint.transaction.to }}</a>
          </p>
        </div>
      </div>
    </div>
    <div class="mt-12 flex justify-between">
      <BackButton @click.native="previous">{{ $t('button.mint_tokens') }}</BackButton>
      <NextButton @click.native="next">{{ $t('button.approve_spender') }}</NextButton>
    </div>
  </div>
</template>

<script>
import BackButton from '../../components/BackButton'
import NextButton from '../../components/NextButton'
import Check from '../../components/Check'
import { mapGetters } from 'vuex'

export default {
  components: { NextButton, BackButton, Check },
  props: {
    network: {
      type: String,
      default: 'ropsten'
    }
  },
  computed: {
    ...mapGetters([
      'mints'
    ])
  },
  data () {
    return {
      tokens: null,
      minting: false
    }
  },
  methods: {
    etherScan (transaction) {
      return `https://${this.network}.etherscan.io/tx/${transaction.transactionHash}`
    },
    previous () {
      this.$router.push({ name: 'register.mint_test_tokens' })
    }
  }
}
</script>
