<template>
    <div :id="id" :style="{height: height + 'px'}"></div>
</template>

<script setup>
import {nextTick, ref} from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
    clickFun: Function
})

const height = ref(200)

const id = Math.random().toString(36)
let echartsC
defineExpose({
    init: (width, pHeight) => height.value = pHeight,
    refresh: option => {
        if (echartsC) {
            echartsC.clear()
            echartsC.setOption(option, true)
            return
        }
        nextTick(() => {
            echartsC = echarts.init(document.getElementById(id))
            echartsC.setOption(option, true)
            if (props.clickFun) {
                echartsC.on('click', props.clickFun)
            }
        })
    }
})
</script>