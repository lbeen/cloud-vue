<template>
    <scroll-table ref="scrollTable" :option="option"></scroll-table>
</template>

<script setup>
import ScrollTable from '@/components/kanban/base/scroll-table.vue'
import {getMaoOnlineList} from '@/api/kanban/machine'
import {inject, ref} from 'vue'

const props = defineProps({
    param: Object,
    hours: Number
})

const option = {
    align: ['center', 'center', 'center', 'center', 'center'],
    dataFun: getMaoOnlineList,
    param: {
        ...props.param,
        hours: props.hours
    }
}
if (props.param.factory === 'BS') {
    option.header = ['晶编', '规格', '时长', '取棒时间']
    option.columnWidth = [50, 120, 70, 55]
} else {
    option.header = ['晶编', '区域', '规格', '取棒时间']
    option.columnWidth = [50, 120, 50, 70]
}

const scrollTable = ref(null)
const init = (width, height) => scrollTable.value.init(width, height)
const refresh = () => scrollTable.value.refresh()

const leafs = inject('leafs')
leafs.push({
    init,
    refresh
})
</script>