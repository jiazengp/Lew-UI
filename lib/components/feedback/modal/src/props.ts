import type { ExtractPropTypes } from 'vue'
import type { ButtonProps } from '../../../general/button/index'

export const modalModel = {
  visible: {
    type: Boolean,
    default: false,
    description: '控制模态框是否可见',
  },
}

export const modalProps = {
  title: {
    type: String,
    default: '',
    description: '模态框标题',
    validator: (value: string) => {
      if (value.length > 50) {
        console.warn('[LewModal] 标题长度不应超过50个字符')
        return false
      }
      return true
    },
  },
  width: {
    type: [String, Number],
    default: 'auto',
    description: '模态框宽度，可以是数字（单位：像素）或字符串（如 "50%"）',
    validator: (value: string | number) => {
      if (typeof value === 'number' && value <= 0) {
        console.warn('[LewModal] 宽度必须大于0')
        return false
      }
      return true
    },
  },
  maxHeight: {
    type: [String, Number],
    default: 'auto',
    description: '模态框最大高度，支持计算属性（如：calc(100vh - 240px))',
  },
  top: {
    type: [String, Number],
    default: 120,
    description:
      '模态框距离顶部的距离，可以是数字（单位：像素）或字符串（如 "50%"）',
  },
  hideFooter: {
    type: Boolean,
    default: false,
    description: '是否隐藏模态框底部',
  },
  closeByEsc: {
    type: Boolean,
    default: false,
    description: '是否允许通过按下 ESC 键关闭模态框',
  },
  okButtonProps: {
    type: Object as PropType<ButtonProps>,
    default: () => ({}),
    description: '确定按钮的属性配置',
  },
  closeButtonProps: {
    type: Object as PropType<ButtonProps>,
    default: () => ({}),
    description: '关闭按钮的属性配置',
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
    description: '是否在点击遮罩层时关闭模态框',
  },
  zIndex: {
    type: Number,
    default: 1001,
    description: '层级',
  },
}

export type ModalProps = ExtractPropTypes<typeof modalProps>
