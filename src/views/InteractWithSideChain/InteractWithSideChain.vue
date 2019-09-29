<template>
  <div>
    <div class="flex flex-col items-center">
      <h1 class="font-lition text-3xl font-bold">{{ $t('headline.interact') }}</h1>
      <div class="mt-8 flex">
        <div :class="{ 'btn-tile-active': selected === 'vesting' }" class="btn-tile" @click="pickOption('vesting')">
          <Check v-if="selected === 'vesting'"></Check>
          <span>{{ $t('interact.vesting') }}</span>
        </div>
        <div :class="{ 'btn-tile-active': selected === 'deposits' }" class="ml-2 btn-tile"
             @click="pickOption('deposits')">
          <Check v-if="selected === 'deposits'"></Check>
          <span>{{ $t('interact.deposits') }}</span>
        </div>
        <div :class="{ 'btn-tile-active': selected === 'mining' }" class="ml-2 btn-tile" @click="pickOption('mining')">
          <Check v-if="selected === 'mining'"></Check>
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
  inject: ['ethereum'],
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
      if (this.selected === 'register') {
        this.$router.push({ name: 'register.network' })
      } else if (this.selected === 'interact') {
        this.$router.push({ name: 'interact.provide_sidechain_id' })
      }
    }
  }
}
</script>
