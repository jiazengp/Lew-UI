<script setup lang="ts">
const n = ref(0)
</script>

<template>
  <lew-flex direction="y" x="start">
    <lew-input-number
      v-model="n"
      max="1000"
      min="-1000"
      step="0.0001"
    />
  </lew-flex>
</template>
