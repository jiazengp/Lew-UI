<script setup lang="ts">
import { schools } from 'docs/lib/data'
import { padStart } from 'lodash-es'

const schoolsOptions = schools.map((e, i) => {
  return { label: e, value: padStart(String(i), 8, '0') }
})

const value = ref('')
</script>

<template>
  <lew-select
    v-model="value"
    style="width: 320px"
    :item-height="48"
    :options="schoolsOptions"
    placeholder="Support slots"
    popover-width="320px"
  >
    <template #item="{ props }">
      <div
        class="custom-select-box"
        :class="{ 'custom-select-checked': props.checked }"
      >
        <div class="custom-select-content">
          <lew-avatar size="32" shape="circle" :alt="props.label" />
          <div class="info">
            <div class="label">
              {{ props.label }}
            </div>
            <div class="desc">
              {{ props.value }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </lew-select>
</template>

<style lang="scss">
.custom-select-box {
  width: 100%;
  height: 48px;
  user-select: none;
  padding: 2px 0px;
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
  .custom-select-content {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0px 8px;
    height: 100%;
    border-radius: var(--lew-border-radius-small);
    box-sizing: border-box;
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .label {
        display: inline-block;
        color: var(--lew-text-color-1);
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 220px;
      }
      .desc {
        color: var(--lew-text-color-5);
        font-size: 12px;
      }
    }
  }
}
.custom-select-box:hover {
  .custom-select-content {
    background: var(--lew-color-primary-light);
  }
}
.custom-select-checked {
  .custom-select-content {
    background: var(--lew-color-primary-light);
  }
}
</style>
