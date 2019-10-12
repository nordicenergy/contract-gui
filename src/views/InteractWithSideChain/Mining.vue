<template>
  <div>
    <div class="flex flex-col items-center">
      <h1 class="font-lition text-3xl font-bold">Mining</h1>
      <p v-if="userDetails" class="mt-2 text-lition-gray font-medium">
        <span v-if="userDetails.mining">Your address is currently mining</span>
        <span v-else>Your address is currently not mining</span>
      </p>
      <div v-else class="w-full mt-8 flex justify-center h-12">
        <span class="spinner-in-page"></span>
      </div>
    </div>
    <div v-if="userDetails" class="relative mt-12 flex justify-center">
      <ConfirmButton @click.native="toggleMining" :disabled="processing">
        <span v-if="userDetails.mining">Stop mining</span>
        <span v-else>Start mining</span>
        <span v-if="processing" class="spinner-button w-5 h-5 mr-2"></span>
      </ConfirmButton>
      <Tooltip v-if="errorMessage" class="absolute top-0 right-0 -mr-48 -mt-6">
        <template slot="headline">MetaMask Error</template>
        <template slot="text">{{ errorMessage }}</template>
      </Tooltip>
    </div>
  </div>
</template>

<script>
import ConfirmButton from '../../components/ConfirmButton'
import Tooltip from '../../components/Tooltip'
import WithErrorMessage from '../../components/WithErrorMessage'

export default {
  components: { ConfirmButton, Tooltip },
  mixins: [WithErrorMessage],
  inject: ['ethereum'],
  props: {
    chain: {
      type: String
    },
    network: {
      type: String
    }
  },
  data () {
    return {
      userDetails: null,
      processing: false
    }
  },
  mounted () {
    this.fetchUserDetails()
  },
  methods: {
    async fetchUserDetails () {
      this.userDetails = await this.ethereum.getUserDetails(this.chain)
    },
    async toggleMining () {
      this.processing = true
      try {
        if (this.userDetails.mining) {
          await this.ethereum.stopMining(this.chain)
        } else {
          await this.ethereum.startMining(this.chain)
        }

        this.fetchUserDetails()
      } catch (e) {
        this.handleError()
      } finally {
        this.processing = false
      }
    }
  }
}
</script>
