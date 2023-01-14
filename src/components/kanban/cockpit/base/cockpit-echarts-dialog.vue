<template>
    <cockpit-dialog :title="title" ref="dialogRef">
        <echarts v-for="index of echartsCount" :key="index" ref="echartsRefs"/>
    </cockpit-dialog>
</template>

<script setup>
import CockpitDialog from '@/components/kanban/cockpit/base/cockpit-dialog.vue'
import Echarts from '@/components/kanban/cockpit/base/echarts.vue'
import {nextTick, ref} from 'vue'

const title = ref('')
const echartsCount = ref(0)
const echartsRefs = ref(null)
const dialogRef = ref(null)
defineExpose({
    show(option) {
        title.value = option.title
        dialogRef.value.show((width, height) => {
            option.dataFun(option.param, data => {
                let count = Math.ceil(data.xAxis.length / 20)
                if (count > 4) {
                    count = 4
                }
                echartsCount.value = count

                const rowCount = Math.ceil(data.xAxis.length / count)
                const eachHeight = height / count
                nextTick(() => {
                    for (let i = 0; i < count; i++) {
                        const start = i * rowCount
                        const end = i * rowCount + rowCount

                        const echartsRef = echartsRefs.value[i]
                        echartsRef.init(width, eachHeight)
                        echartsRef.refresh(option.optionFun(data, start, end))
                    }
                })
            })
        })
    }
})
</script>