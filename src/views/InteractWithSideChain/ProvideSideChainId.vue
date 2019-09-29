<template>
  <div>
    <div class="flex flex-col items-center">
      <h1 class="font-lition text-3xl font-bold">{{ $t('headline.provide_sidechain') }}</h1>
      <div class="mt-8 flex flex-col">
        <label class="text-xs text-lition-gray font-medium">{{ $t('label.sidechain_id') }}</label>
        <TextInput v-model="chain"></TextInput>
      </div>
    </div>
    <div class="mt-12 flex justify-between">
      <BackButton @click.native="previous">{{ $t('button.main_menu') }}</BackButton>
      <NextButton :disabled="!validChainId" @click.native="next">{{ $t('button.interact_with_chain') }}</NextButton>
    </div>
  </div>
</template>

<script>
import BackButton from '../../components/BackButton'
import NextButton from '../../components/NextButton'
import TextInput from '../../components/TextInput'
import { isNumeric } from '../../utils'

export default {
  components: { TextInput, BackButton, NextButton },
  data () {
    return {
      chain: null
    }
  },
  computed: {
    validChainId () {
      return isNumeric(this.chain)
    }
  },
  methods: {
    next () {
      this.$router.push({ name: 'interact', params: { chain: this.chain } })
    },
    previous () {
      this.$router.push({ name: 'welcome' })
    }
  }
}
</script>
