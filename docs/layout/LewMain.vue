<script setup lang="ts">
import TheHeader from './TheHeader.vue'

const route = useRoute()
watch(route, () => {
  setBackgroundColor()
})

function setBackgroundColor() {
  if (route.name === 'R-LewHome') {
    document.body.style.backgroundColor = 'var(--lew-bgcolor-0)'
  }
  else {
    document.body.style.backgroundColor = 'var(--lew-bgcolor-4)'
  }
}

onMounted(() => {
  setBackgroundColor()
})
</script>

<template>
  <div class="wrapper">
    <TheHeader
      :style="{
        background:
          route.name === 'R-LewHome' ? 'transparent' : 'var(--lew-bgcolor-0)',
      }"
    />
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  margin: 0 auto;
  max-width: 1440px;
  border-left: var(--lew-border-2);
  border-right: var(--lew-border-2);
  background-color: var(--lew-bgcolor-0);
}

@media (max-width: 767px) {
  .wrapper {
    width: 100vw;
    border-left: none;
    border-right: none;
  }
}
</style>
