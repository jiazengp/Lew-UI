<script setup lang="ts">
import { any2px } from 'lew-ui/utils'
import { titleProps } from './props'

const props = defineProps(titleProps)

const titleStyle = computed(() => {
  const { bold, color } = props
  const size = any2px(props.size)
  const colorStyle = color
    ? `
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    color: transparent;background-image: linear-gradient(-252deg, var(--lew-color-${color}-dark),var(--lew-color-${color}))`
    : ''
  return `font-weight:${bold};font-size:${size};${colorStyle}`
})
</script>

<template>
  <div class="lew-title" :style="titleStyle">
    <template v-if="text">
      {{ text }}
    </template>
    <slot v-else />
  </div>
</template>

<style lang="scss" scoped>
.lew-title {
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--lew-text-color-0);
  margin-bottom: 10px;
}
</style>
