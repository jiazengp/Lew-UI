<script setup lang="ts">
import { LewPopover, LewContextMenu } from 'lew-ui'
import { dropdownProps } from './props'
import type { DropdownOptions } from './props'

defineProps(dropdownProps)

const selectedKeys = defineModel<string[]>('selectedKeys')

const emit = defineEmits(['change'])

const lewPopoverRef = ref()

const show = () => {
  lewPopoverRef.value.show()
}

const hide = () => {
  lewPopoverRef.value.hide()
}

const change = (item: DropdownOptions) => {
    console.log(item)
  emit('change', item)
  hide()
}

defineExpose({
  show,
  hide
})
</script>

<template>
  <lew-popover
    ref="lewPopoverRef"
    popover-body-class-name="lew-dropdown-popover-body"
    :trigger="trigger"
    :placement="placement"
  >
    <template #trigger>
      <slot />
    </template>
    <template #popover-body>
      <lew-context-menu
        v-model:selected-keys="selectedKeys"
        :checkbox="checkbox"
        :options="options"
        @select="change"
      />
    </template>
  </lew-popover>
</template>
