<script setup lang="ts">
const v = ref([30, 60])
</script>

<template>
  <lew-slider-range
    v-model="v"
    style="width: 500px"
    step="5"
    max="70"
    min="30"
    range
    :options="[
      {
        label: '低',
        value: 0,
      },
      {
        label: '中',
        value: 50,
      },
      {
        label: '高',
        value: 100,
      },
    ]"
  />
</template>
