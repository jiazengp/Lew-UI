<script setup lang="ts">
const v = ref('')
</script>

<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-input v-model="v" size="small" clearable showCount :maxLength="30" />
    <lew-input v-model="v" clearable showCount :maxLength="30" />
    <lew-input v-model="v" size="large" clearable showCount :maxLength="30" />
  </lew-flex>
</template>
