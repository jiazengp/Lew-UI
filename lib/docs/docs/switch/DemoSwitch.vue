<script setup lang="ts">
import {
  DemoSwitch1,
  DemoSwitch2,
  DemoSwitch3,
  DemoSwitch4,
  DemoSwitch1Code,
  DemoSwitch2Code,
  DemoSwitch3Code,
  DemoSwitch4Code
} from './demo'
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import * as API from './api'

const options = ref(
  Object.keys(API).map((key: any) => {
    // @ts-ignore
    return API[key]
  })
)
</script>

<template>
  <div class="demo-wrapper">
    <lew-title>Switch</lew-title>
    <lew-demo-box title="圆的" :code="DemoSwitch1Code">
      <demo-switch1 />
    </lew-demo-box>
    <lew-demo-box title="方的" :code="DemoSwitch2Code">
      <demo-switch2 />
    </lew-demo-box>
    <lew-demo-box title="异步" :code="DemoSwitch3Code">
      <demo-switch3 />
    </lew-demo-box>
    <lew-demo-box title="只读和禁用" :code="DemoSwitch4Code">
      <demo-switch4 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
