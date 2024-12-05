import type { ExtractPropTypes } from 'vue'
import { validSizes } from 'lew-ui/constants'
import { LewSize } from 'lew-ui/types'

export type SliderRangeOptions = {
  label: string
  value: string | number
}

export const sliderRangeModel = {
  modelValue: {
    type: Array as PropType<number[] | undefined>,
    default: undefined,
    description: '滑块范围的绑定值'
  }
}

export const sliderRangeProps = {
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '尺寸',
    validator(value: LewSize) {
      if (!validSizes.includes(value)) {
        console.warn(
          `[LewInputNumber] size 必须是 ${validSizes.join('、')} 之一`
        )
        return false
      }
      return true
    }
  },
  min: {
    type: [Number, String],
    default: '0',
    description: '最小值',
    validator(value: number | string) {
      if (value && typeof value === 'string' && isNaN(Number(value))) {
        console.warn('[LewInputNumber] min 必须是有效的数字')
        return false
      }
      return true
    }
  },
  max: {
    type: [Number, String],
    default: '',
    description: '最大值',
    validator(value: number | string) {
      if (value && typeof value === 'string' && isNaN(Number(value))) {
        console.warn('[LewInputNumber] max 必须是有效的数字')
        return false
      }
      return true
    }
  },
  step: {
    type: [Number, String],
    default: 1,
    description: '步长',
    validator(value: number | string) {
      const numValue = Number(value)
      if (isNaN(numValue) || numValue <= 0) {
        console.warn('[LewInputNumber] step 必须是大于 0 的数字')
        return false
      }
      return true
    }
  },

  readonly: {
    type: Boolean,
    default: false,
    description: '是否只读'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用'
  },
  options: {
    type: Array as PropType<SliderRangeOptions[]>,
    default: () => [
      {
        label: '0',
        value: 0
      },
      {
        label: '100',
        value: 100
      }
    ],
    description: '步进器配置'
  },
  formatTooltip: {
    type: Function as PropType<(value: number) => string>,
    default: (value: number) => value.toString(),
    description: '格式化 tooltip 内容'
  }
}

export type SliderRangeProps = ExtractPropTypes<typeof sliderRangeProps>
