<script setup lang="ts">
import tippy, { roundArrow } from 'tippy.js'
import { object2class } from 'lew-ui/utils'
import { textTrimProps } from './props'
import { escape } from 'lodash-es'
import { useMouse } from '@vueuse/core'

const props = defineProps(textTrimProps)

const lewTextTrimRef = ref()
const lewTextTrimPopRef = ref()

let instance: any

const initTippy = () => {
  const element = lewTextTrimRef.value
  if (!element) {
    return
  }
  const { placement, allowHTML, text, offset }: any = props
  let isEllipsis = false
  if (props.lineClamp) {
    isEllipsis = element.offsetHeight < element.scrollHeight
  } else {
    isEllipsis = element.offsetWidth < element.scrollWidth
  }
  // 如果溢出
  if (isEllipsis) {
    element.style.cursor = 'pointer'
    // 如果没有init
    if (!instance) {
      instance = tippy(element, {
        theme: 'light',
        delay: props.delay as any,
        duration: [250, 250],
        content: text ? sanitizeHtml(text) : lewTextTrimPopRef.value,
        animation: 'scale',
        hideOnClick: false,
        interactive: true,
        appendTo: () => document.body,
        placement,
        offset,
        allowHTML: allowHTML,
        arrow: roundArrow,
        maxWidth: 250
      })
      instance.popper.children[0].setAttribute('data-lew', 'tooltip')
      showTippy()
    }
  } else {
    element.style.cursor = ''
    // 如果没溢出
    destroyTippy()
  }
}

const showTippy = () => {
  const { x, y } = useMouse()
  if (props.delay && Array.isArray(props.delay) && props.delay[0] > 0) {
    setTimeout(() => {
      try {
        // 判断当前鼠标是否在元素范围内
        const element = lewTextTrimRef.value
        if (!element) return

        const rect = element.getBoundingClientRect()
        // 检查鼠标坐标是否在元素矩形区域内
        if (
          x.value >= rect.left &&
          x.value <= rect.right &&
          y.value >= rect.top &&
          y.value <= rect.bottom
        ) {
          instance?.show()
        }
      } catch (error) {
        console.error('显示提示时发生错误:', error)
      }
    }, props.delay[0])
  } else {
    try {
      instance?.show()
    } catch (error) {
      console.error('显示提示时发生错误:', error)
    }
  }
}

const sanitizeHtml = (html: string) => {
  return escape(html)
}

const getTextTrimStyleObject = computed(() => {
  if (props.lineClamp) {
    return `display: -webkit-box;-webkit-line-clamp: ${props.lineClamp};-webkit-box-orient: vertical;`
  }
  return 'white-space: nowrap;'
})

const getClassNames = computed(() => {
  const { x } = props
  return object2class('lew-text-trim', { x })
})

const destroyTippy = () => {
  instance && instance.destroy()
  instance = null
}
</script>

<template>
  <div
    ref="lewTextTrimRef"
    class="lew-text-trim-wrapper"
    :class="getClassNames"
    :style="getTextTrimStyleObject"
    @mouseenter="initTippy"
  >
    <template v-if="text">
      {{ text }}
    </template>
    <slot v-else />
    <div ref="lewTextTrimPopRef" class="lew-text-trim-pop">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-text-trim-wrapper {
  overflow: hidden;
  text-overflow: ellipsis; //文本溢出显示省略号
  .lew-text-trim-pop {
    position: fixed;
    opacity: 0;
    z-index: -9;
  }
}

.lew-text-trim-x-start {
  text-align: left;
}

.lew-text-trim-x-center {
  text-align: center;
}

.lew-text-trim-x-end {
  text-align: right;
}
</style>
