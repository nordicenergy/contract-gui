<template>
  <div>
    <div class="flex flex-col items-center" style="min-width: 400px;">
      <h1 class="font-lition text-3xl font-bold">
        {{ $t('headline.mint.mint') }} <span class="text-active">{{ $t('headline.mint.lit') }}</span> {{
        $t('headline.mint.test_tokens') }}
      </h1>
      <div class="mt-8 w-3/4 mx-auto">
        <label v-if="!processing" class="text-xs text-lition-gray font-medium">{{ $t('label.tokens') }}</label>
        <label v-else class="text-xs text-lition-gray font-medium">{{ $t('mint.minting_tokens') }}</label>
        <MintTokensInput @mint="handleMinting" v-model="tokens" :loading="processing" placeholder="LIT 0"></MintTokensInput>
      </div>
      <div class="mt-8" v-if="lastMint">
        <div class="flex items-center">
          <Check size="xxs"></Check>
          <p class="ml-4 text-md font-bold">{{ lastMint.tokens }} LIT tokens successfully minted on</p>
        </div>
        <p class="ml-8 text-md text-lition-gray">
          <a class="hover:text-secondary" :href="etherScan(network, lastMint.transaction)" target="_blank">{{ lastMint.transaction.from
            }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import MintTokensInput from '../../components/MintTokensInput'
import { mapGetters } from 'vuex'
import Check from '../../components/Check'
import WithEtherScan from '../../components/WithEtherScan'

export default {
  beforeRouteEnter (to, from, next) {
    if (to.params.network === 'main') {
      next({ name: 'interact.provide_sidechain_id', params: { network: this.ethereum.getNetworkName() } })
    }

    next()
  },
  mixins: [WithEtherScan],
  components: { MintTokensInput, Check },
  inject: ['ethereum'],
  computed: {
    ...mapGetters([
      'network'
    ])
  },
  data () {
    return {
      tokens: null,
      processing: false,
      lastMint: null
    }
  },
  methods: {
    async handleMinting () {
      this.processing = true
      try {
        const response = await this.ethereum.mint(this.tokens)
        this.lastMint = {
          tokens: this.tokens,
          transaction: response
        }
      } catch (e) {
        console.log(e)
        // @TODO handle error
        // @TODO handle meta mask transaction cancellation
      } finally {
        this.processing = false
      }
    }
  }
}
</script>
