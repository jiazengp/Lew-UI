<script setup lang="ts">
import LewComponentInfo from 'docs/layout/LewComponentInfo.vue'
import LewDemoBox from '../../layout/LewDemoBox.vue'
</script>

<template>
  <div class="demo-wrapper">
    <LewComponentInfo />

    <LewDemoBox title="图标废弃通知">
      <lew-alert type="info">
        <template #title>
          Icon 组件废弃通知
        </template>
        <template #content>
          我们将在 <b>v2.4.0</b> 版本中不再内置图标组件。<br><br>
          这是因为我们希望：
          <br>
          1. 让您能够更灵活地使用图标
          <br>
          2. 减小打包体积
          <br><br>
          我们的组件库将使用
          <a href="https://lucide.dev/" target="_blank"> https://lucide.dev </a>
          作为默认图标库。
          <br><br>
          <b>推荐解决方案:</b>
          <br>
          1. 直接使用 Lucide Icons，保持与组件库一致的设计风格
          <br>
          2. 使用 @lucide/vue 包来按需引入所需图标
          <br>
          3. 如需自定义图标，可参考 Lucide Icons 的设计规范
          <br><br>
          我们相信这次优化将为您的项目带来更大的灵活性。如果您在迁移过程中需要帮助，我们的文档中心随时为您提供支持。
        </template>
      </lew-alert>
    </LewDemoBox>
  </div>
</template>
