<script setup lang="ts">
import type { UploadFileItem } from 'lew-ui'
import uploadHelper from '../uploadHelper'

const fileList = ref<UploadFileItem[]>([])
</script>

<template>
  <lew-flex width="500px">
    <lew-upload
      v-model="fileList"
      :max-file-size="1024 * 1024 * 2"
      :limit="3"
      :upload-helper="uploadHelper"
    />
  </lew-flex>
</template>
