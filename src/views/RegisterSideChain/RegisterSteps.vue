<template>
  <div>
    <span class="inline-block text-md text-white mt-4 ml-8">{{ $t('steps') }}</span>
    <ul class="mt-4 ml-8 w-48 text-md">
      <li class="flex items-center justify-between text-white">
        <span>{{ $t('register.steps.one') }}</span>
        <span><Check size="xs"></Check></span>
      </li>
      <li class="mt-2 flex items-center justify-between text-white">
        <span>{{ $t('register.steps.two') }}</span>
        <span><Check size="xs"></Check></span>
      </li>
      <li class="mt-2 flex items-center justify-between text-white">
        <span>{{ $t('register.steps.three') }}</span>
        <span><Check size="xs"></Check></span>
      </li>
      <li class="mt-2 flex items-center justify-between text-white">
        <span>{{ $t('register.steps.four') }}</span>
        <span><Check size="xs"></Check></span>
      </li>
    </ul>
  </div>
</template>

<script>
import Check from '../../components/Check'

export default {
  components: { Check }
}
</script>
