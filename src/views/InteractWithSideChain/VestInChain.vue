<template>
  <div>
    <div class="flex flex-col items-center">
      <h1 class="font-lition text-3xl font-bold">{{ $t('headline.vest_in_chain') }}</h1>
      <div class="w-3/4 mt-8">
        <label class="text-xs text-lition-gray font-medium">Tokens to vest</label>
        <LitTextInput v-model="tokens" @action="handleAction" :loading="processing" placeholder="LIT 0">Vest
        </LitTextInput>
      </div>
    </div>
    <div class="mt-12 flex justify-between">
      <BackButton @click.native="previous">Back to Vesting menu</BackButton>
    </div>
  </div>
</template>

<script>
import LitTextInput from '../../components/LitTextInput'
import BackButton from '../../components/BackButton'

export default {
  inject: ['ethereum'],
  props: {
    chain: {
      type: String
    },
    network: {
      type: String
    }
  },
  components: { LitTextInput, BackButton },
  data () {
    return {
      tokens: null,
      processing: false
    }
  },
  methods: {
    async handleAction () {
      this.processing = true
      try {
        const response = await this.ethereum.requestVestInChain(this.chain, this.tokens)
        console.log(response)
        this.$store.dispatch('setVestInChain', {
          tokens: this.tokens,
          timestamp: new Date(),
          transaction: response
        })
        await this.$router.push({
          name: 'interact.vest_in_chain_completed',
          params: { chain: this.chain, network: this.network }
        })
      } catch (e) {
        // @TODO handle error
        console.log(e)
      } finally {
        this.processing = false
      }
    },
    previous () {
      this.$router.push({ name: 'interact.vesting', params: { chain: this.chain, network: this.network } })
    }
  }
}
</script>
