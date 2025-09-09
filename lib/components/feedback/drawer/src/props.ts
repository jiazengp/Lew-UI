import type { Property } from 'csstype'
import type { LewButtonProps } from 'lew-ui'
import type { LewDrawerPosition } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validDrawerPositionList } from 'lew-ui/validators'

export const drawerModel = {
  visible: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewDrawer',
      propName: 'visible',
    }),
  },
}

export const drawerProps = {
  title: {
    type: String,
    validator: validators.string({
      componentName: 'LewDrawer',
      propName: 'title',
    }),
  },
  position: {
    type: String as PropType<LewDrawerPosition>,
    default: 'right',
    typeValues: validDrawerPositionList,
    validator: validators.enum({
      componentName: 'LewDrawer',
      propName: 'position',
      values: validDrawerPositionList,
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '500px',
    validator: validators.widthHeight({
      componentName: 'LewDrawer',
      propName: 'width',
    }),
  },
  height: {
    type: String as PropType<Property.Height>,
    default: '500px',
    validator: validators.widthHeight({
      componentName: 'LewDrawer',
      propName: 'height',
    }),
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewDrawer',
      propName: 'closeOnClickOverlay',
    }),
  },
  closeByEsc: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewDrawer',
      propName: 'closeByEsc',
    }),
  },
  hideFooter: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewDrawer',
      propName: 'hideFooter',
    }),
  },
  okButtonProps: {
    type: Object as PropType<LewButtonProps>,
    validator: validators.object({
      componentName: 'LewDrawer',
      propName: 'okButtonProps',
    }),
  },
  closeButtonProps: {
    type: Object as PropType<LewButtonProps>,
    validator: validators.object({
      componentName: 'LewDrawer',
      propName: 'closeButtonProps',
    }),
  },
  zIndex: {
    type: Number,
    default: 1001,
    validator: validators.nonNegativeInteger({
      componentName: 'LewDrawer',
      propName: 'zIndex',
    }),
  },
}

export type LewDrawerProps = ExtractPublicPropTypes<typeof drawerProps>
