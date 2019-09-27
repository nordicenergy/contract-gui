<template>
  <div>
    <div class="flex flex-col items-center">
      <span class="text-lition-gray text-sm font-medium">{{ $t('step') }} 2/4</span>
      <h1 class="font-lition text-3xl font-bold">
        {{ $t('headline.mint.mint') }} <span class="text-active">{{ $t('headline.mint.lit') }}</span> {{
        $t('headline.mint.test_tokens') }}
      </h1>
      <div class="mt-8 w-3/4 mx-auto">
        <label v-if="!minting" class="text-xs text-lition-gray font-medium">{{ $t('mint.tokens') }}</label>
        <label v-else class="text-xs text-lition-gray font-medium">{{ $t('mint.minting_tokens') }}</label>
        <MintTokensInput @mint="handleMinting" v-model="tokens" placeholder="LIT 0"></MintTokensInput>
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

export default {
  components: { NextButton, BackButton },
  props: {
    network: {
      type: String,
      default: 'ropsten'
    }
  },
  data () {
    return {
      tokens: null,
      minting: false
    }
  },
  methods: {
    previous () {
      this.$router.push({ name: 'register.mint_test_tokens' })
    }
  }
}
</script>
