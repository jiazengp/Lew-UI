<script setup lang="ts">
let v = ref(25)
</script>

<template>
  <lew-slider
    style="width: 500px"
    v-model="v"
    step="5"
    min="20"
    max="50"
    :options="[
      {
        label: '低',
        value: 0
      },
      {
        label: '中',
        value: 50
      },
      {
        label: '高',
        value: 100
      }
    ]"
  />
</template>
