<template>
  <div>
    <div class="flex flex-col items-center">
      <h1 class="font-lition text-3xl font-bold">Request vesting in chain completed</h1>
    </div>
    <div v-if="lastVestIncreaseInChain" class="mt-6">
      <div class="mt-2">
        <div class="flex items-center">
          <Check size="xxs"></Check>
          <p class="ml-4 text-md font-bold">LIT tokens successfully requested to be vested
            from</p>
        </div>
        <p class="ml-8 text-md text-lition-gray">
          <a class="hover:text-secondary" :href="etherScan(network, lastVestIncreaseInChain.transaction)" target="_blank">{{
            lastVestIncreaseInChain.transaction.from
            }}</a>
        </p>
      </div>
    </div>
    <div class="mt-12 flex justify-between">
      <BackButton @click.native="previous">Back to Vesting menu</BackButton>
    </div>
  </div>
</template>

<script>
import Check from '../../components/Check'
import { mapGetters } from 'vuex'
import WithEtherScan from '../../components/WithEtherScan'
import BackButton from '../../components/BackButton'

export default {
  mixins: [WithEtherScan],
  props: {
    chain: {
      type: String
    },
    network: {
      type: String
    }
  },
  components: { Check, BackButton },
  computed: {
    ...mapGetters([
      'lastVestIncreaseInChain'
    ])
  },
  methods: {
    previous () {
      this.$router.push({ name: 'interact.vesting', params: { network: this.network } })
    }
  }
}
</script>
