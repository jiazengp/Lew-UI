<script setup lang="ts">
const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)
const open1 = (): void => {
  visible1.value = true
}
const open2 = (): void => {
  visible2.value = true
}
const open3 = (): void => {
  visible3.value = true
}
const open4 = (): void => {
  visible4.value = true
}
</script>
<template>
  <lew-flex gap="20" x="start">
    <lew-drawer title="新建商品" v-model:visible="visible1" position="right">
      <lew-image
        previewGroupKey="cover"
        object-position="top"
        :width="150"
        :height="150"
        src="https://app.tngeek.com/api_sso/open/file/b4c64ae_cat-8321993_1280.webp"
      />
    </lew-drawer>
    <lew-button text="右边" @click="open1" />
    <lew-drawer title="新建商品" v-model:visible="visible2" position="bottom" />
    <lew-button text="下边" @click="open2" />
    <lew-drawer title="新建商品" v-model:visible="visible3" position="left" />
    <lew-button text="左边" @click="open3" />
    <lew-drawer title="新建商品" v-model:visible="visible4" position="top" />
    <lew-button text="上边" @click="open4" />
  </lew-flex>
</template>
<style lang="scss" scoped>
.title {
  padding: 10px;
  background-color: var(--lew-bgcolor-3);
  border-radius: 5px;
  color: #f93;
}
</style>
