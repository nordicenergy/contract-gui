<template>
  <div>
    <div class="flex flex-col items-center">
      <h1 class="font-lition text-3xl font-bold">{{ $t('welcome.headline') }}</h1>
      <div class="mt-8 flex">
        <div class="btn-tile" @click="pickOption(1)">
          <Check v-if="selected === 1"></Check>
          <span>{{ $t('welcome.register') }}</span>
          <span>{{ $t('welcome.new_chain') }}</span>
        </div>
        <div class="ml-2 btn-tile" @click="pickOption(2)">
          <Check v-if="selected === 2"></Check>
          <span>{{ $t('welcome.interact') }}</span>
          <span>{{ $t('welcome.with_chain') }}</span>
        </div>
      </div>
    </div>
    <div class="mt-12 flex justify-end">
      <Button>{{ $t('button.next') }}</Button>
    </div>
  </div>
</template>

<script>
import Check from '../components/Check'
import Button from '../components/Button'

export default {
  components: { Check, Button },
  data () {
    return {
      selected: null
    }
  },
  methods: {
    pickOption (optionNumber) {
      if (this.selected === optionNumber) {
        this.selected = null
      } else {
        this.selected = optionNumber
      }
    }
  }
}
</script>
