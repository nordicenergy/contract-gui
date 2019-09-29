<template>
  <div>
    <div class="flex flex-col items-center">
      <span class="text-lition-gray text-sm font-medium">{{ $t('step') }} 2/4</span>
      <h1 class="font-lition text-3xl font-bold">
        {{ $t('headline.mint.mint') }} <span class="text-active">{{ $t('headline.mint.lit') }}</span> {{
        $t('headline.mint.test_tokens') }}
      </h1>
      <p class="mt-2 text-lition-gray font-medium" v-html="$t('mint.metamask')"></p>
      <p class="mt-2 text-lition-gray font-medium">
        {{ $t('mint.skip.first') }}
        <router-link class="text-secondary hover:underline" :to="{ name: 'register.approve_spender', params: { network: network }}">{{
          $t('mint.skip.second') }}
        </router-link>
      </p>
      <div class="mt-8 w-3/4 mx-auto">
        <label v-if="!processing" class="text-xs text-lition-gray font-medium">{{ $t('label.tokens') }}</label>
        <label v-else class="text-xs text-lition-gray font-medium">{{ $t('mint.minting_tokens') }}</label>
        <MintTokensInput @mint="handleMinting" v-model="tokens" :loading="processing" placeholder="LIT 0"></MintTokensInput>
        <router-link class="inline-block mt-4 text-sm font-medium text-secondary hover:underline" v-if="mints.length > 0" :to="{ name: 'register.minted_test_tokens', params: { network: network } }">{{ $t('mint.see_mints') }}</router-link>
      </div>
    </div>
    <div class="mt-12 flex justify-between">
      <BackButton @click.native="previous">{{ $t('button.choose_network') }}</BackButton>
      <NextButton @click.native="next">{{ $t('button.approve_spender') }}</NextButton>
    </div>
  </div>
</template>

<script>
import BackButton from '../../components/BackButton'
import NextButton from '../../components/NextButton'
import MintTokensInput from '../../components/MintTokensInput'
import { mapGetters } from 'vuex'

export default {
  components: { MintTokensInput, NextButton, BackButton },
  inject: ['ethereum'],
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
      processing: false
    }
  },
  methods: {
    previous () {
      this.$router.push({ name: 'register.network' })
    },
    next () {
      this.$router.push({ name: 'register.approve_spender', params: { network: this.network } })
    },
    async handleMinting () {
      this.processing = true
      try {
        const response = await this.ethereum.mint(this.tokens)
        this.$store.dispatch('addMint', {
          tokens: this.tokens,
          timestamp: new Date(),
          transaction: response
        })
        await this.$router.push({ name: 'register.minted_test_tokens', params: { network: this.network } })
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
