<template>
  <div>
    <div class="flex flex-col items-center">
      <h1 class="font-lition text-3xl font-bold">{{ $t('headline.register.network') }}</h1>
      <p class="mt-2 text-lition-gray font-medium">{{ $t('subheadline.register.network') }}</p>
      <SelectInput class="mt-8" :options="networks" @select:change="selectNetwork">{{ $t('register.select_network') }}
      </SelectInput>
      <h1 class="mt-8 font-lition text-3xl font-bold">{{ $t('headline.provide_sidechain') }}</h1>
      <div class="mt-8 flex flex-col">
        <label class="text-xs text-lition-gray font-medium">{{ $t('label.sidechain_id') }}</label>
        <TextInput v-model="chain"></TextInput>
      </div>
    </div>
    <div class="mt-12 flex justify-between">
      <BackButton @click.native="previous">{{ $t('button.main_menu') }}</BackButton>
      <NextButton :disabled="!valid" @click.native="next">{{ $t('button.interact_with_chain') }}</NextButton>
    </div>
  </div>
</template>

<script>
import BackButton from '../../components/BackButton'
import NextButton from '../../components/NextButton'
import TextInput from '../../components/TextInput'
import SelectInput from '../../components/SelectInput'
import { isNumeric } from '../../utils'

export default {
  components: { TextInput, BackButton, NextButton, SelectInput },
  data () {
    return {
      networks: [{
        value: 'ropsten',
        text: 'Ropsten Network'
      }],
      chain: null,
      network: null
    }
  },
  computed: {
    valid () {
      return isNumeric(this.chain) && this.network !== null
    }
  },
  methods: {
    next () {
      this.$router.push({ name: 'interact', params: { network: this.network, chain: this.chain } })
    },
    previous () {
      this.$router.push({ name: 'welcome' })
    },
    selectNetwork (network) {
      this.network = network
    }
  }
}
</script>
