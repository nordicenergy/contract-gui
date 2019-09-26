<template>
  <div>{{ network }}</div>
</template>

<script>
export default {
  props: {
    network: {
      type: String,
      default: 'ropsten'
    }
  }
}
</script>
