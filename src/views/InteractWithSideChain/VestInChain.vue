<template>
  <div>
    <div class="flex flex-col items-center">
      <h1 class="font-lition text-3xl font-bold">{{ $t('headline.vest_in_chain') }}</h1>
      <div class="w-3/4 mt-8">
        <label class="text-xs text-lition-gray font-medium">Tokens to vest</label>
        <ActionTextInput v-model="tokens" @action="handleAction" :loading="processing" placeholder="LIT 0">Vest</ActionTextInput>
      </div>
    </div>
  </div>
</template>

<script>
import ActionTextInput from '../../components/ActionTextInput'

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
  components: { ActionTextInput },
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
        // this.$store.dispatch('addApproval', {
        //   tokens: this.tokens,
        //   timestamp: new Date(),
        //   transaction: response
        // })
        await this.$router.push({ name: 'register.approve_transactions', params: { network: this.network } })
      } catch (e) {
        // @TODO handle error
        console.log(e)
      } finally {
        this.processing = false
      }
    }
  }
}
</script>
