<script setup lang="ts">
import {
  DemoDialog1,
  DemoDialog1Code,
  DemoDialog2,
  DemoDialog2Code
} from './demo'
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import * as API from './api'

const options = ref(
  Object.keys(API).map((key) => {
    // @ts-ignore
    return API[key]
  })
)

const { push } = useRouter()
</script>

<template>
  <div class="demo-wrapper">
    <lew-title>Dialog</lew-title>
    <p class="sub-title">
      如果你需要更简单的询问框，请可以尝试一下
      <lew-mark
        cursor="pointer"
        type="light"
        color="blue"
        @click="push('/Popok')"
        >Popok</lew-mark
      >
    </p>
    <lew-demo-box title="快捷唤起" :code="DemoDialog1Code">
      <demo-dialog1 />
    </lew-demo-box>
    <lew-demo-box title="简单的" :code="DemoDialog2Code">
      <demo-dialog2 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
