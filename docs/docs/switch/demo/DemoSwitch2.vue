<script setup lang="ts">
const value = ref(false)

function change(e: unknown) {
  console.log(e)
  console.log(value.value)
}
</script>

<template>
  <lew-switch v-model="value" :round="false" @change="change" />
</template>
