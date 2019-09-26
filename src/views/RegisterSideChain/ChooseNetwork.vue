<template>
  <div>
    <div class="flex flex-col items-center">
      <span class="text-lition-gray text-sm font-medium">{{ $t('step') }} 1/4</span>
      <h1 class="font-lition text-3xl font-bold">{{ $t('headline.register.network') }}</h1>
      <p class="mt-2 text-lition-gray font-medium">{{ $t('subheadline.register.network') }}</p>
      <SelectInput class="mt-8" :options="networks" @select:change="selectNetwork">{{ $t('register.select_network') }}
      </SelectInput>
    </div>
    <div class="mt-12 flex justify-between">
      <BackButton @click.native="previous">{{ $t('button.previous') }}</BackButton>
      <NextButton @click.native="next" :disabled="!selected">{{ $t('button.next') }}</NextButton>
    </div>
  </div>
</template>

<script>
import NextButton from '../../components/NextButton'
import BackButton from '../../components/BackButton'
import SelectInput from '../../components/SelectInput'

export default {
  components: { NextButton, BackButton, SelectInput },
  data () {
    return {
      networks: [{
        value: 'ropsten',
        text: 'Ropsten Network'
      }],
      selected: null
    }
  },
  methods: {
    selectNetwork (network) {
      this.selected = network
    },
    previous () {
      this.$router.push({ name: 'welcome' })
    },
    next () {
      if (this.selected === 'ropsten') {
        this.$router.push({ name: 'register.mint_test_tokens', params: { network: 'ropsten' } })
      }
    }
  }
}
</script>
