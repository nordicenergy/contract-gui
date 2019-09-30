<template>
  <div>
    <div class="flex flex-col items-center">
      <h1 class="font-lition text-3xl font-bold">Confirm vest in chain</h1>
    </div>
    <div class="mt-8">
      <span class="uppercase text-sm text-lition-gray font-medium">Chain id:</span>
      <span class="uppercase text-sm ml-2">{{ chain }}</span>
    </div>
    <div class="mt-2">
      <router-link class="inline-block mt-4 text-sm font-medium text-secondary hover:underline" :to="{ name: 'interact.provide_sidechain_id' }">Change chain id</router-link>
    </div>
    <div class="mt-12 flex justify-between">
      <BackButton @click.native="previous">Back to Vesting menu</BackButton>
      <ConfirmButton @click.native="handleAction">Confirm vest</ConfirmButton>
    </div>
  </div>
</template>

<script>
import ConfirmButton from '../../components/ConfirmButton'
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
  components: { BackButton, ConfirmButton },
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
        const response = await this.ethereum.confirmVestInChain(this.chain)

        this.$store.dispatch('setConfirmVestInChain', {
          chain: this.chain,
          timestamp: new Date(),
          transaction: response
        })

        await this.$router.push({
          name: 'interact.confirm_vest_increase_completed',
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
