<script setup lang="ts">
import { cityTree } from '@/lib/data'

const v = ref<string>('')

const change = (e: any) => {
  console.log(e)
}
</script>

<template>
  <lew-flex direction="y" gap="20px" style="width: 300px">
    <lew-tree-select
      v-model="v"
      keyField="value"
      labelField="label"
      :data-source="cityTree"
      @change="change"
    >
      <template #item="{ props }">
        {{ props.label }}
        <span>（{{ props.value }}）</span>
      </template>
    </lew-tree-select>
  </lew-flex>
</template>
