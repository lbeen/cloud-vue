<template>
    <scroll-board :config="config" :style="{height: height + 'px'}"/>
</template>

<script setup>
import {ScrollBoard} from '@kjgl77/datav-vue3'
import {ref} from 'vue'

const props = defineProps({
    option: {
        type: Object,
        default: () => {}
    }
})

const defaultOption = {
    index: true,
    checkSame(newData, oldData) {
        if (!oldData) {
            return false
        }
        if (newData.length !== oldData.length) {
            return false
        }
        for (let i = 0; i < newData.length; i++) {
            if (newData[i][0] !== oldData[i][0]) {
                return false
            }
        }
        return true
    }
}
Object.assign(defaultOption, props.option)

const height = ref(0)
const config = ref({})
const init=(width, pHeight)=> {
    height.value = pHeight
    if (defaultOption.dataFun) {
        refresh()
    }
}
const refresh = () => defaultOption.dataFun(defaultOption.param, refreshData)
const refreshData = data =>  {
    if (defaultOption.checkSame(data.data, config.value.data)) {
        return
    }
    config.value = {
        rowNum: defaultOption.rowNum || 5,
        header: defaultOption.header || data.header,
        data: data.data,
        index: defaultOption.index,
        indexHeader: '序号',
        columnWidth: defaultOption.columnWidth,
        align: defaultOption.align,
        headerBGC: 'rgb(21 41 92)',
        oddRowBGC: 'rgb(28 37 74)',
        evenRowBGC: ''
    }
}

defineExpose({
    init,
    refresh,
    refreshData
})
</script>