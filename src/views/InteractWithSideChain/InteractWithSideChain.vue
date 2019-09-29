<template>
  <div>
    <div class="flex flex-col items-center">
      <h1 class="font-lition text-3xl font-bold">{{ $t('headline.interact') }}</h1>
      <div class="mt-8 flex">
        <div :class="{ 'btn-tile-active': selected === 'interact.vesting' }" class="btn-tile"
             @click="pickOption('interact.vesting')">
          <Check v-if="selected === 'interact.vesting'"></Check>
          <span>{{ $t('interact.vesting') }}</span>
        </div>
        <div :class="{ 'btn-tile-active': selected === 'interact.deposits' }" class="ml-2 btn-tile"
             @click="pickOption('interact.deposits')">
          <Check v-if="selected === 'interact.deposits'"></Check>
          <span>{{ $t('interact.deposits') }}</span>
        </div>
        <div :class="{ 'btn-tile-active': selected === 'interact.mining' }" class="ml-2 btn-tile"
             @click="pickOption('interact.mining')">
          <Check v-if="selected === 'interact.mining'"></Check>
          <span>{{ $t('interact.mining') }}</span>
        </div>
      </div>
    </div>
    <div class="mt-12 flex justify-between">
      <BackButton @click.native="previous">{{ $t('button.main_menu') }}</BackButton>
      <NextButton :disabled="!selected" @click.native="next">{{ $t('button.next') }}</NextButton>
    </div>
  </div>
</template>

<script>
import BackButton from '../../components/BackButton'
import NextButton from '../../components/NextButton'
import Check from '../../components/Check'

export default {
  props: {
    chain: {
      type: String
    }
  },
  data () {
    return {
      selected: null
    }
  },
  components: { BackButton, NextButton, Check },
  methods: {
    pickOption (optionNumber) {
      if (this.selected === optionNumber) {
        this.selected = null
      } else {
        this.selected = optionNumber
      }
    },
    previous () {
      this.$router.push({ name: 'interact.provide_sidechain_id' })
    },
    next () {
      if (this.selected === 'interact.vesting') {
        this.$router.push({ name: 'interact.vesting', params: { chain: this.chain } })
      } else if (this.selected === 'interact.deposits') {
        this.$router.push({ name: 'interact.deposits', params: { chain: this.chain } })
      } else if (this.selected === 'interact.mining') {
        this.$router.push({ name: 'interact.mining', params: { chain: this.chain } })
      }
    }
  }
}
</script>
