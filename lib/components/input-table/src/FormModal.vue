<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import { LewModal, LewForm } from 'lew-ui'
import type { ButtonProps } from 'lew-ui'

const visible = ref(false)
const formRef = ref()
const form = ref({})
const editIndex = ref(-1)
const id = ref('')

const props = defineProps({
  options: {
    type: Object
  },
  size: {
    type: String,
    default: ''
  },
  checkUniqueFieldFn: {
    type: Function,
    default: () => true
  }
})

const emit = defineEmits(['addSuccess', 'editSuccess'])

const open = ({ row = {}, index = -1 }: { row: any; index: number }) => {
  visible.value = true
  editIndex.value = index
  id.value = row.id
  form.value = cloneDeep(row)
}

const ok = () => {
  formRef.value.validate().then((res: boolean) => {
    if (res) {
      if (editIndex.value >= 0) {
        emit('editSuccess', {
          row: { ...formRef.value.getForm(), id: id.value },
          index: editIndex.value
        })
      } else {
        const _form = formRef.value.getForm()

        if (!props.checkUniqueFieldFn(_form)) {
          return
        }

        emit('addSuccess', { row: { ..._form, id: id.value } })
      }
      visible.value = false
    } else {
      LewMessage.warning('请根据提示填写表单')
    }
  })
}

const formMounted = () => {
  formRef.value.setForm(form.value)
}

defineExpose({ open })
</script>

<template>
  <lew-modal
    v-model:visible="visible"
    :cancelProps="
      {
        text: '取消'
      } as ButtonProps
    "
    :okProps="
      {
        text: '保存'
      } as ButtonProps
    "
    @ok="ok"
    @cancel="visible = false"
    :title="`${editIndex >= 0 ? '编辑' : '新增'}数据`"
  >
    <div class="lew-form-modal lew-scrollbar">
      <lew-form
        :siz="size"
        @mounted="formMounted"
        ref="formRef"
        width="350"
        :options="options as Record<string, any>[]"
      />
    </div>
  </lew-modal>
</template>

<style lang="scss" scoped>
.lew-form-modal {
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 80vh;
}

.lew-form-modal-footer {
  padding: 5px 15px;
}
</style>
