<template>
  <div>
    <div class="flex flex-col items-center">
      <h1 class="font-lition text-3xl font-bold">{{ $t('headline.approve_spender') }}</h1>
      <p class="mt-2 text-lition-gray font-medium"
         v-html="$t('approve.smart_contract', { smartContractLink: smartContractLink } )"></p>
      <div class="mt-8 w-3/4 mx-auto">
        <label v-if="!processing" class="text-xs text-lition-gray font-medium">{{ $t('label.tokens') }}</label>
        <label v-else class="text-xs text-lition-gray font-medium">{{ $t('approve.approving_spender') }}</label>
        <ApproveSpenderInput @approve="handleApproval" v-model="tokens" :loading="processing"
                             placeholder="LIT 0"></ApproveSpenderInput>
      </div>
      <div class="mt-8" v-if="lastApproval">
        <div class="flex items-center">
          <Check size="xxs"></Check>
          <p class="ml-4 text-md font-bold">{{ lastApproval.tokens }} LIT tokens approved to be manipulated by smart
            contract</p>
        </div>
        <p class="ml-8 text-md text-lition-gray">
          <a class="hover:text-secondary" :href="etherScan(lastApproval.transaction)" target="_blank">{{ getSpender(lastApproval.transaction) }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ApproveSpenderInput from '../../components/ApproveSpenderInput'
import Check from '../../components/Check'
import { etherScanAddress, getLitionRegistryAddress, etherScanTransaction } from '../../utils'
import { getSpender } from '../../transactionUtils'
export default {
  components: { ApproveSpenderInput, Check },
  inject: ['ethereum'],
  props: {
    network: {
      type: String,
      default: 'ropsten'
    },
    chain: {
      type: String
    }
  },
  computed: {
    smartContractLink () {
      return etherScanAddress(this.network, getLitionRegistryAddress(this.network))
    }
  },
  data () {
    return {
      tokens: null,
      processing: false,
      lastApproval: null
    }
  },
  methods: {
    getSpender (transaction) {
      return getSpender(transaction)
    },
    etherScan (transaction) {
      return etherScanTransaction(this.network, transaction.transactionHash)
    },
    async handleApproval () {
      this.processing = true
      try {
        const response = await this.ethereum.approve(this.tokens)
        this.lastApproval = {
          tokens: this.tokens,
          transaction: response
        }
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
