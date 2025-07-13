import { contextMenuProps } from 'lew-ui'
import { convertProps } from '@/lib/utils'

export default {
    title: 'Props',
    columnsKey: 'props',
    orderNum: 1,
    data: convertProps(contextMenuProps),
}
