<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import {
  LewPopover,
  LewCheckbox,
  LewFlex,
  LewTag,
  LewTextTrim,
  LewEmpty
} from 'lew-ui'
import { object2class, numFormat } from 'lew-ui/utils'
import type { SelectMultipleOptions } from './props'
import { selectMultipleProps } from './props'
import { VirtList } from 'vue-virt-list'
import Icon from 'lew-ui/utils/Icon.vue'
import { isFunction } from 'lodash-es'
import { flattenOptions, defaultSearchMethod } from '../../select/src/util'
import { poll } from 'lew-ui/utils'
import { locale } from 'lew-ui'
import { any2px } from 'lew-ui/utils'
const props = defineProps(selectMultipleProps)
const emit = defineEmits(['change', 'select', 'clear', 'delete', 'blur'])
const selectValue: any = defineModel()

const lewSelectRef = ref()
const lewPopoverRef = ref()
const lewPopoverValueRef = ref()
const searchInputRef = ref()
const virtListRef = ref()
const state = reactive({
  selectWidth: 0,
  visible: false,
  loading: false,
  options: flattenOptions(props.options),
  keyword: ''
})

const formMethods: any = inject('formMethods', {})

let _searchMethod = computed(() => {
  if (isFunction(props.searchMethod)) {
    return props.searchMethod
  } else if (props.searchMethodId) {
    return formMethods[props.searchMethodId]
  } else {
    return defaultSearchMethod
  }
})

const getSelectWidth = () => {
  state.selectWidth = lewSelectRef.value?.clientWidth - 12
  if (props.searchable) {
    setTimeout(() => {
      searchInputRef.value && searchInputRef.value.focus()
    }, 100)
  }
}

const show = () => {
  lewPopoverRef.value && lewPopoverRef.value.show()
}

const hide = () => {
  lewPopoverRef.value && lewPopoverRef.value.hide()
}

const searchDebounce = useDebounceFn(async (e: any) => {
  search(e)
}, props.searchDelay)

const search = async (e?: any) => {
  state.loading = true
  const keyword = e?.target.value
  if (props.searchable) {
    let result: any = []
    // 如果没输入关键词
    if (!keyword && props.options.length > 0) {
      result = flattenOptions(props.options)
    } else {
      result = await _searchMethod.value({
        options: flattenOptions(props.options),
        keyword
      })
    }
    state.options = result
  }
  state.loading = false
}

const clearHandle = () => {
  selectValue.value = []
  emit('clear')
  // 刷新位置
  setTimeout(() => {
    lewPopoverRef.value && lewPopoverRef.value.refresh()
  }, 100)
  emit('change', selectValue.value)
}

const deleteTag = ({ value }: { value: any }) => {
  const valueIndex = selectValue.value.findIndex(
    (_value: any) => value === _value
  )

  if (valueIndex > -1) {
    const item = selectValue.value[valueIndex]
    selectValue.value.splice(valueIndex, 1)
    console.log(selectValue.value)
    emit('delete', { item, value: selectValue.value })

    // 刷新位置
    if (selectValue.value.length === 0) {
      lewPopoverValueRef.value && lewPopoverValueRef.value.hide()
    }
    setTimeout(() => {
      lewPopoverRef.value && lewPopoverRef.value.refresh()
    }, 100)
    emit('change', selectValue.value)
  }
}

const selectHandle = (item: SelectMultipleOptions) => {
  if (item.disabled || item.isGroup) {
    return
  }

  const _value = selectValue.value || []

  const index = _value.findIndex((e: string | number) => e === item.value)

  if (index >= 0) {
    _value.splice(index, 1)
  } else {
    _value.push(item.value)
  }

  selectValue.value = _value
  emit('select', item)
  // 刷新位置
  setTimeout(() => {
    lewPopoverRef.value && lewPopoverRef.value.refresh()
  }, 100)
  emit('change', selectValue.value)
}

const getChecked = computed(() => (value: string | number) => {
  if (selectValue.value) {
    return JSON.parse(JSON.stringify(selectValue.value.includes(value)))
  }
  return false
})

const getSelectedRows = computed(() => {
  let _defaultValue = (props.defaultValue || []).map((e: any) => {
    return {
      label: e,
      value: e
    }
  })
  if (state.options.length > 0) {
    const selectedRows =
      selectValue.value &&
      selectValue.value.map((v: number | string) => {
        return state.options.find((e: SelectMultipleOptions) => v === e.value)
      })
    if (!selectedRows || selectedRows.length === 0) {
      return _defaultValue
    }
    return selectedRows
  }
  return _defaultValue
})

const getBodyClassName = computed(() => {
  const { size, disabled } = props
  return object2class('lew-select-body', { size, disabled })
})

const getSelectClassName = computed(() => {
  let { clearable, size, disabled, readonly } = props
  clearable = clearable ? !!selectValue.value : false
  const focus = state.visible
  return object2class('lew-select', {
    clearable,
    size,
    disabled,
    readonly,
    focus
  })
})

const getSelectItemClassName = (e: any) => {
  const { disabled, isGroup } = e
  const active = getChecked.value(e.value)

  return object2class('lew-select-item', {
    disabled,
    active,
    'is-group': isGroup
  })
}

const getIconSize = computed(() => {
  const size: any = {
    small: 14,
    medium: 15,
    large: 16
  }
  return size[props.size]
})

const showHandle = () => {
  state.visible = true

  getSelectWidth()
  if (state.options && state.options.length === 0 && props.searchable) {
    search({ target: { value: '' } })
  }
  // 找到所有选中值的index，取最小的
  if ((selectValue.value || []).length > 0) {
    const indexes = selectValue.value
      .map((value: any) =>
        state.options.findIndex((e: any) => e.value === value)
      )
      .filter((index: number) => index > -1)

    if (indexes.length > 0) {
      const minIndex = Math.min(...indexes)
      poll({
        callback: () => {
          virtListRef.value.scrollToIndex(minIndex)
        },
        vail: () => {
          return !!virtListRef.value
        }
      })
    }
  }
}

const getVirtualHeight = computed(() => {
  let height = state.options.length * props.itemHeight
  height = height >= 280 ? 280 : height
  return height
})

const isShowScrollBar = computed(() => {
  return getVirtualHeight.value >= 280
})

const hideHandle = () => {
  state.visible = false
  emit('blur')
}
onMounted(() => {
  getSelectWidth()
})

defineExpose({ show, hide })

watch(
  () => props.options,
  () => {
    state.options = flattenOptions(props.options)
  },
  {
    deep: true
  }
)

const getResultText = computed(() => {
  return state.options.length > 0
    ? locale.t('selectMultiple.resultCount', {
        num: numFormat(state.options.filter((e: any) => !e.isGroup).length)
      })
    : ''
})
</script>

<template>
  <lew-popover
    ref="lewPopoverRef"
    popoverBodyClassName="lew-select-multiple-popover-body"
    class="lew-select-view"
    :trigger="trigger"
    :disabled="disabled || readonly"
    placement="bottom-start"
    :style="{ width: any2px(width) }"
    :loading="state.loading"
    @show="showHandle"
    @hide="hideHandle"
  >
    <template #trigger>
      <div ref="lewSelectRef" class="lew-select" :class="getSelectClassName">
        <Icon
          :size="getIconSize"
          type="chevron-down"
          class="lew-icon-select"
          :class="{
            'lew-icon-select-hide':
              clearable && getSelectedRows && getSelectedRows.length > 0
          }"
        />
        <transition name="lew-form-icon-ani">
          <Icon
            v-if="
              clearable &&
              getSelectedRows &&
              getSelectedRows.length > 0 &&
              !readonly
            "
            :size="getIconSize"
            type="close"
            class="lew-form-icon-close"
            :class="{
              'lew-form-icon-close-focus': state.visible
            }"
            @click.stop="clearHandle"
          />
        </transition>
        <template v-if="getSelectedRows && getSelectedRows.length > 0">
          <lew-flex
            v-if="valueLayout === 'tag'"
            :style="{ padding: '4px' }"
            x="start"
            y="center"
            :gap="4"
            wrap
            class="lew-value"
          >
            <transition-group name="list">
              <lew-tag
                v-for="item in getSelectedRows"
                :key="item.value"
                type="light"
                :size="size"
                :closable="!disabled && !readonly"
                @close="deleteTag(item)"
              >
                {{ item.label }}
              </lew-tag>
            </transition-group>
          </lew-flex>
          <template v-else>
            <lew-popover
              ref="lewPopoverValueRef"
              trigger="hover"
              popoverBodyClassName="lew-select-multiple-popover-tag"
              placement="top-start"
              style="width: 100%"
            >
              <template #trigger>
                <div
                  :style="{
                    opacity: state.visible ? 0.6 : 1
                  }"
                  class="lew-select-multiple-text-value"
                >
                  {{
                    getSelectedRows
                      .map((item: any) => item.label)
                      .join(valueTextSplit)
                  }}
                </div>
              </template>
              <template #popover-body>
                <lew-flex
                  x="start"
                  y="center"
                  :gap="5"
                  wrap
                  :style="{
                    maxWidth: `${state.selectWidth + 12}px`
                  }"
                  class="lew-select-multiple-tag-value"
                >
                  <lew-tag
                    v-for="item in getSelectedRows"
                    :key="item.value"
                    type="light"
                    :size="size"
                    :closable="!disabled && !readonly"
                    @close="deleteTag(item)"
                  >
                    {{ item.label }}
                  </lew-tag>
                </lew-flex>
              </template>
            </lew-popover>
          </template>
        </template>
        <div
          v-show="getSelectedRows && getSelectedRows.length === 0"
          :style="{
            opacity: state.visible ? 0.6 : 1
          }"
          class="lew-placeholder"
        >
          {{
            placeholder ? placeholder : locale.t('selectMultiple.placeholder')
          }}
        </div>
      </div>
    </template>
    <template #popover-body>
      <div
        class="lew-select-body"
        :class="getBodyClassName"
        :style="`width:${state.selectWidth}px`"
      >
        <slot name="header"></slot>
        <div v-if="searchable" class="lew-search-input">
          <input
            ref="searchInputRef"
            v-model="state.keyword"
            :placeholder="locale.t('selectMultiple.searchPlaceholder')"
            @input="searchDebounce"
          />
        </div>
        <div class="lew-select-options-box">
          <template v-if="state.options && state.options.length === 0">
            <slot v-if="$slots.empty" name="empty"></slot>
            <lew-flex v-else direction="y" x="center" class="lew-not-found">
              <lew-empty :title="locale.t('selectMultiple.noResult')" />
            </lew-flex>
          </template>

          <template v-else>
            <div v-show="searchable" class="lew-result-count">
              {{ getResultText }}
            </div>
            <virt-list
              ref="virtListRef"
              :list="state.options"
              :minSize="itemHeight"
              :buffer="5"
              itemKey="value"
              :style="{
                height: `${getVirtualHeight}px`,
                paddingRight: isShowScrollBar ? '5px' : '0px'
              }"
              class="lew-select-options-list lew-scrollbar"
            >
              <template #default="{ itemData: templateProps }">
                <div
                  :style="{ height: itemHeight + 'px' }"
                  @click="selectHandle(templateProps)"
                >
                  <slot
                    v-if="$slots.item"
                    name="item"
                    :props="{
                      ...templateProps,
                      checked: getChecked(templateProps.value)
                    }"
                  ></slot>
                  <div
                    v-else
                    class="lew-select-item lew-select-item-mul"
                    :class="getSelectItemClassName(templateProps)"
                  >
                    <lew-checkbox
                      v-if="!templateProps.isGroup"
                      :key="templateProps.value"
                      class="lew-select-checkbox"
                      :checked="getChecked(templateProps.value)"
                    />
                    <lew-text-trim
                      :text="
                        templateProps.isGroup
                          ? `${templateProps.label} (${templateProps.total})`
                          : templateProps.label
                      "
                      :delay="[500, 0]"
                      class="lew-select-label"
                      :class="{ 'is-group': templateProps.isGroup }"
                    />
                  </div>
                </div>
              </template>
            </virt-list>
          </template>
        </div>
        <slot name="footer"></slot>
      </div>
    </template>
  </lew-popover>
</template>

<style lang="scss" scoped>
.lew-select-view {
  width: 100%;

  > div {
    width: 100%;
  }

  .lew-select {
    position: relative;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: var(--lew-border-radius-small);
    background-color: var(--lew-form-bgcolor);
    transition: all var(--lew-form-transition-ease);
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
    box-shadow: var(--lew-form-box-shadow);
    .lew-icon-select {
      position: absolute;
      top: 50%;
      right: 9px;
      transform: translateY(-50%) rotate(0deg);
      transition: all var(--lew-form-transition-bezier);
      opacity: var(--lew-form-icon-opacity);
      padding: 2px;

      &-hide {
        opacity: 0;
        transform: translate(100%, -50%);
      }
    }

    .lew-placeholder {
      color: rgb(165, 165, 165);
    }

    .lew-select-label-multiple {
      width: 100%;
      display: flex;
      align-items: center;

      .lew-popover {
        display: flex;
        align-items: center;

        > div {
          display: flex;
          align-items: center;
        }
      }
    }

    :deep() {
      .lew-tag {
        background-color: var(--lew-bgcolor-0) !important;
      }
    }

    .lew-placeholder {
      width: calc(100% - 24px);
      transition: all 0.2s;
      height: 100%;
    }
    .lew-value {
      display: flex;
      align-items: center;
      width: calc(100% - 24px);
      transition: all 0.2s;
      height: 100%;
    }

    .lew-placeholder,
    .lew-select-multiple-text-value {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      box-sizing: border-box;
    }

    &:hover {
      background-color: var(--lew-form-bgcolor-hover);
    }

    &:active {
      background-color: var(--lew-form-bgcolor-active);
    }
  }

  .lew-select-size {
    &-small {
      min-height: var(--lew-form-item-height-small);

      .lew-placeholder,
      .lew-select-multiple-text-value {
        font-size: var(--lew-form-font-size-small);
        margin-left: 10px;
        padding-right: 26px;
        line-height: calc(
          var(--lew-form-item-height-small) - (var(--lew-form-border-width) * 2)
        );
      }
    }

    &-medium {
      min-height: var(--lew-form-item-height-medium);

      .lew-placeholder,
      .lew-select-multiple-text-value {
        font-size: var(--lew-form-font-size-medium);
        margin-left: 12px;
        padding-right: 28px;
        line-height: calc(
          var(--lew-form-item-height-medium) -
            (var(--lew-form-border-width) * 2)
        );
      }
    }

    &-large {
      min-height: var(--lew-form-item-height-large);

      .lew-placeholder,
      .lew-select-multiple-text-value {
        font-size: var(--lew-form-font-size-large);
        margin-left: 14px;
        padding-right: 30px;
        line-height: calc(
          var(--lew-form-item-height-large) - (var(--lew-form-border-width) * 2)
        );
      }
    }
  }

  .lew-select-focus {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
      solid;

    :deep() {
      .lew-tag {
        background-color: var(--lew-color-primary-light) !important;
      }
    }

    .lew-icon-select {
      transform: translateY(-50%) rotate(180deg);
      color: var(--lew-text-color-1);

      &-hide {
        opacity: 0;
        transform: translate(100%, -50%) rotate(180deg);
      }
    }
  }

  .lew-select-focus:hover {
    background-color: var(--lew-form-bgcolor-focus);
  }

  .lew-select-readonly {
    pointer-events: none;

    .lew-select {
      user-select: text;
    }
  }

  .lew-select-disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none;

    &:hover {
      border-radius: var(--lew-border-radius-small);
      background-color: var(--lew-form-bgcolor);
      border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
    }
  }
}

.list {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: all var(--lew-form-transition-bezier);
  }

  &-enter-from {
    opacity: 0;
    transform: translateX(-5px);
  }
  &-leave-to {
    opacity: 0;
    transform: scaleX(0);
  }

  &-leave-active {
    position: absolute;
  }
}
</style>

<style lang="scss">
.lew-select-multiple-popover {
  &-body {
    padding: 6px;
  }

  &-tag {
    .lew-select-multiple-tag-value {
      padding: 5px;
      box-sizing: border-box;
    }
  }
}

.lew-select-body {
  width: 100%;
  box-sizing: border-box;

  .lew-search-input {
    margin-bottom: 5px;
    padding: 0px 5px;

    input {
      outline: none;
      border: none;
      background-color: transparent;
      width: 100%;
      height: 32px;
      padding: 0px 7px;
      box-sizing: border-box;
      transition: all var(--lew-form-transition-bezier);
      border-bottom: var(--lew-form-border-width) var(--lew-form-bgcolor-hover)
        solid;
      color: var(--lew-text-color-2);
      &:focus {
        border-bottom: var(--lew-form-border-width)
          var(--lew-form-border-color-focus) solid;
      }
    }
    input:placeholder {
      color: rgb(165, 165, 165);
    }
  }

  .lew-select-options-box {
    overflow-y: auto;
    overflow-x: hidden;
    height: auto;
    box-sizing: border-box;
    transition: all 0.25s ease;
    margin-top: -4px;
    margin-bottom: -4px;

    .lew-select-item {
      &-mul {
        position: relative;
        display: inline-flex;
        align-items: center;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        color: var(--lew-text-color-1);
        box-sizing: border-box;
        margin-top: 2px;

        .lew-select-checkbox {
          position: absolute;
          left: 0px;
          top: 50%;
          transform: translateY(-50%);
          padding-left: 12px;
        }

        .lew-select-label {
          position: relative;
          z-index: 5;
          height: 30px;
          line-height: 30px;
          padding-left: 38px;
          box-sizing: border-box;
          cursor: pointer !important;

          &.is-group {
            padding-left: 12px;
            color: var(--lew-text-color-7);
            font-size: 12px;
            pointer-events: none;
            padding-top: 4px;
          }
        }
      }

      &-disabled {
        opacity: var(--lew-disabled-opacity);
        pointer-events: none;
      }

      &:hover {
        color: var(--lew-text-color-0);
        background-color: var(--lew-pop-bgcolor-hover);

        .lew-checkbox {
          .lew-checkbox-icon-box {
            border: var(--lew-form-border-width)
              var(--lew-checkbox-border-color-hover) solid;
            background: var(--lew-form-bgcolor);
          }
        }
      }

      &-active {
        color: var(--lew-checkbox-color);
        font-weight: bold;
        background-color: var(--lew-pop-bgcolor-hover);

        .icon-check {
          margin-right: 10px;
        }

        &:hover {
          color: var(--lew-checkbox-color);
          font-weight: bold;
          background-color: var(--lew-pop-bgcolor-hover);

          .lew-checkbox {
            .lew-checkbox-icon-box {
              border: var(--lew-form-border-width) var(--lew-checkbox-color)
                solid;
              background: var(--lew-checkbox-color);

              .icon-checkbox {
                transform: translate(-50%, -50%) scale(0.7);
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }

  .lew-result-count {
    padding: 5px 12px;
    font-size: 13px;
    opacity: 0.7;
  }
}
</style>
