<script setup lang="ts">
import * as Yup from 'yup'

const options = ref([
  {
    field: 'username',
    label: '用户名',
    as: 'input',
    rules: Yup.string().required()
  },
  {
    field: 'password',
    label: '密码',
    as: 'input',
    rules: Yup.string().min(6).required(),
    props: {
      type: 'password'
    }
  },
  {
    field: 'phone',
    label: '手机',
    as: 'input'
  }
])

const formRef = ref()
</script>

<template>
  <lew-form ref="formRef" class="form-box" :options="options" :labelWidth="80" />
</template>
<style scoped lang="scss">
.form-box {
  width: 380px;
  margin: 0 auto;
}
@media (max-width: 767px) {
  .form-box {
    width: 100%;
  }
}
</style>
