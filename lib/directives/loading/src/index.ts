import type { App as Application, DirectiveBinding } from 'vue'
import { LewIcon } from 'lew-ui'

import { createApp } from 'vue'
import '../styles/index.scss'

export default {
  install(app: Application) {
    app.directive('loading', {
      mounted(el: HTMLElement, binding: DirectiveBinding) {
        const { tip, iconSize, visible } = binding.value
        const loadingWrapper: HTMLElement = document.createElement('div')
        const loadingBox: HTMLElement = document.createElement('div')
        loadingWrapper.classList.add('lew-loading-wrapper')
        loadingBox.classList.add('lew-loading-box')

        el.classList.add('lew-loading')
        //  add loading icon
        const loader = createApp(LewIcon, {
          type: 'loader',
          animation: 'spin',
          'animation-speed': 'fast',
          size: iconSize
        })
        loader.mount(loadingBox)
        // // add loading text
        loadingBox.setAttribute('data-after', tip || '')

        loadingWrapper.appendChild(loadingBox)
        el.appendChild(loadingWrapper)

        if (visible) {
          el.classList.add('lew-loading-show')
        }
      },
      updated(el: HTMLElement, binding: DirectiveBinding) {
        const { tip, visible } = binding.value
        // 查找 el 下类名为 lew-loading-box 的元素
        const loadingBox = el.querySelector('.lew-loading-box')
        // 更新 loading 文字
        loadingBox && loadingBox.setAttribute('data-after', tip || '')
        if (visible) {
          el.classList.add('lew-loading-show')
        } else {
          el.classList.remove('lew-loading-show')
        }
      }
    })
  }
}
