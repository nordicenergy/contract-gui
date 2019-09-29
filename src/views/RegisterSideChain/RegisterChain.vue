<template>
  <div>
    <div class="flex flex-col items-center" style="width: 350px;">
      <span class="text-lition-gray text-sm font-medium">{{ $t('step') }} 3/4</span>
      <h1 class="font-lition text-3xl font-bold">{{ $t('headline.register_chain') }}</h1>
      <div class="relative mt-8 flex flex-col w-full">
        <label class="text-xs text-lition-gray font-medium">{{ $t('label.description') }}</label>
        <TextInput v-model="description" ref="description" @focus.native="focus = 'description'"
                   @blur.native="focus = null"
                   class="w-full"></TextInput>
        <Tooltip v-if="active === 'description'" class="absolute right-0 -mr-48">
          <template slot="headline">Description</template>
          <template slot="text">Some explanation text about description ?</template>
        </Tooltip>
      </div>
      <div class="relative mt-2 flex flex-col w-full">
        <label class="text-xs text-lition-gray font-medium">{{ $t('label.init_endpoint') }}</label>
        <TextInput v-model="initEndpoint" ref="endpoint" @focus.native="focus = 'endpoint'" @blur.native="focus = null"
                   class="w-full"></TextInput>
        <Tooltip v-if="active === 'endpoint'" class="absolute right-0 -mr-48">
          <template slot="headline">Initial endoint</template>
          <template slot="text">Some explanation text about endpoint ?</template>
        </Tooltip>
      </div>
      <div class="relative mt-2 flex flex-col w-full">
        <label class="text-xs text-lition-gray font-medium">{{ $t('label.chain_validator') }}</label>
        <TextInput v-model="chainValidator" ref="validator" @focus.native="focus = 'validator'"
                   @blur.native="focus = null"
                   class="w-full"></TextInput>
        <Tooltip v-if="active === 'validator'" class="absolute right-0 -mr-48">
          <template slot="headline">Chain Validator</template>
          <template slot="text">Some explanation text about chain validator ?</template>
        </Tooltip>
      </div>
      <div class="relative mt-2 flex flex-col w-full">
        <label class="text-xs text-lition-gray font-medium">{{ $t('label.vesting') }}</label>
        <TextInput v-model="vesting" ref="vesting" @focus.native="focus = 'vesting'"
                   @blur.native="focus = null"
                   class="w-full"></TextInput>
        <Tooltip v-if="active === 'vesting'" class="absolute right-0 -mr-48">
          <template slot="headline">Vesting</template>
          <template slot="text">Some explanation text about vesting ?</template>
        </Tooltip>
      </div>
      <div class="relative mt-2 flex flex-col w-full">
        <label class="text-xs text-lition-gray font-medium">{{ $t('label.deposit') }}</label>
        <TextInput v-model="deposit" ref="deposit" @focus.native="focus = 'deposit'"
                   @blur.native="focus = null"
                   class="w-full"></TextInput>
        <Tooltip v-if="active === 'deposit'" class="absolute right-0 -mr-48">
          <template slot="headline">Deposit</template>
          <template slot="text">Some explanation text about deposit ?</template>
        </Tooltip>
      </div>
      <div class="relative mt-2 flex flex-col w-full">
        <label class="text-xs text-lition-gray font-medium">{{ $t('label.max_validators') }}</label>
        <TextInput v-model="maxValidators" ref="max_validators" @focus.native="focus = 'max_validators'"
                   @blur.native="focus = null"
                   class="w-full"></TextInput>
        <Tooltip v-if="active === 'max_validators'" class="absolute right-0 -mr-48">
          <template slot="headline">Max number of validators</template>
          <template slot="text">Some explanation text about maximum number of validators ?</template>
        </Tooltip>
      </div>
      <div class="relative mt-2 flex flex-col w-full">
        <label class="text-xs text-lition-gray font-medium">{{ $t('label.max_transactors') }}</label>
        <TextInput v-model="maxTransactors" ref="max_transactors" @focus.native="focus = 'max_transactors'"
                   @blur.native="focus = null"
                   class="w-full"></TextInput>
        <Tooltip v-if="active === 'max_transactors'" class="absolute right-0 -mr-48">
          <template slot="headline">Max number of transactors</template>
          <template slot="text">Some explanation text about maximum number of transactors ?</template>
        </Tooltip>
      </div>
      <div class="mt-2 w-full">
        <label class="text-xs text-lition-gray font-medium cursor-pointer">{{ $t('label.notary_conditions') }}</label>
      </div>
      <div class="mt-2 flex w-full">
        <div class="relative flex items-center w-1/2">
          <CheckboxInput ref="vesting_cond" v-model="notaryVesting"></CheckboxInput>
          <label @click="notaryVesting = !notaryVesting"
                 class="ml-2 text-xs text-lition-gray font-medium cursor-pointer">{{ $t('label.vesting_cond') }}</label>
          <Tooltip v-if="active === 'vesting_cond'" class="absolute right-0 top-0 -mt-8 -mr-40 z-10">
            <template slot="headline">Vesting condition</template>
            <template slot="text">Some explanation text about vesting condition ?</template>
          </Tooltip>
        </div>
        <div class="relative flex items-center w-1/2">
          <CheckboxInput ref="participation_cond" v-model="notaryParticipation"></CheckboxInput>
          <label @click="notaryParticipation = !notaryParticipation"
                 class="ml-2 text-xs text-lition-gray font-medium cursor-pointer">{{ $t('label.participation_cond')
            }}</label>
          <Tooltip v-if="active === 'participation_cond'" class="absolute right-0 top-0 -mt-8 -mr-40 z-10">
            <template slot="headline">Participation condition</template>
            <template slot="text">Some explanation text about participation condition ?</template>
          </Tooltip>
        </div>
      </div>
    </div>
    <div class="mt-12 flex justify-between">
      <BackButton @click.native="previous">{{ $t('button.approve_spender') }}</BackButton>
      <ConfirmButton @click.native="handleRegistration" :disabled="processing">
        <span v-if="!processing">{{ $t('button.register_chain') }}</span>
        <span v-else>{{ $t('button.registering') }}</span>
        <span v-if="processing" class="spinner-button w-5 h-5 mr-4"></span>
      </ConfirmButton>
    </div>
  </div>
</template>

<script>
import BackButton from '../../components/BackButton'
import ConfirmButton from '../../components/ConfirmButton'
import TextInput from '../../components/TextInput'
import CheckboxInput from '../../components/CheckboxInput'
import Tooltip from '../../components/Tooltip'
import { etherScanAddress } from '../../utils'
import config from '../../config'
import { getChainId } from '../../transactionUtils'

export default {
  components: { ConfirmButton, BackButton, TextInput, CheckboxInput, Tooltip },
  inject: ['ethereum'],
  props: {
    network: {
      type: String,
      default: 'ropsten'
    }
  },
  computed: {
    smartContractLink () {
      return etherScanAddress(this.network, config.litionRegistryContractAddress)
    },
    active () {
      if (this.focus !== null) {
        return this.focus
      }

      return this.activeHover
    }
  },
  data () {
    return {
      focus: null,
      activeHover: null,
      processing: false,
      description: null,
      initEndpoint: null,
      chainValidator: config.litionValidatorContractAddress,
      vesting: null,
      deposit: null,
      maxValidators: null,
      maxTransactors: null,
      notaryVesting: false,
      notaryParticipation: false
    }
  },
  mounted () {
    Object.keys(this.$refs).forEach(ref => {
      this.$refs[ref].$el.addEventListener('mouseenter', () => {
        this.activeHover = ref
      })
      this.$refs[ref].$el.addEventListener('mouseleave', () => {
        this.activeHover = null
      })
    })
  },
  beforeDestroy () {
    Object.keys(this.$refs).forEach(ref => {
      this.$refs[ref].$el.removeEventListener('mouseenter', () => {
        this.activeHover = ref
      })
      this.$refs[ref].$el.removeEventListener('mouseleave', () => {
        this.activeHover = null
      })
    })
  },
  methods: {
    previous () {
      this.$router.push({ name: 'register.approve_spender', params: { network: this.network } })
    },
    async handleRegistration () {
      this.processing = true
      try {
        const response = await this.ethereum.registerChain(
          this.description,
          this.initEndpoint,
          this.chainValidator,
          this.vesting,
          this.deposit,
          this.maxTransactors,
          this.maxTransactors,
          this.notaryVesting,
          this.notaryParticipation
        )

        this.$store.dispatch('addRegistration', {
          timestamp: new Date(),
          transaction: response
        })

        await this.$router.push({
          name: 'register.completed',
          params: { network: this.network, chain: getChainId(response) }
        })

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
