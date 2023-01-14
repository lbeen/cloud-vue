<template>
    <echarts ref="echarts" :click-fun="echartsClick"/>
    <pay-length-dialog ref="dialogRef" :factory="factory"/>
</template>

<script setup>
import Echarts from '@/components/kanban/cockpit/base/echarts.vue'
import PayLengthDialog from '@/components/kanban/cockpit/machine/dialog/pay-length-dialog.vue'
import {getPayLengthByProcess} from '@/api/cockpit/machine-cockpit'
import {inject, ref} from 'vue'

const props = defineProps({
    factory: String
})

const echarts = ref(null)
const init = (width, pHeight) => {
    echarts.value.init(width, pHeight)
    refresh()
}
const refresh = () => {
    getPayLengthByProcess({
        factory: props.factory
    }, data => {
        const option = {
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                top: '10%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: data.xAxis,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#2d3b53'
                    }
                },
                axisLabel: {
                    color: '#FFFFFF',
                    fontSize: 8
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#2d3b53'
                    }
                },
                axisLabel: {
                    fontSize: 8,
                    color: '#999'
                }
            },
            series: {
                data: data.yAxis,
                type: 'bar',
                areaStyle: {},
                label: {
                    show: true,
                    position: 'top',
                    color: '#FFFFFF',
                    fontSize: 10,
                    formatter: params => params.data + 'mm'
                }
            }
        }
        echarts.value.refresh(option)
    })
}

const leafs = inject('leafs')
leafs.push({
    init,
    refresh
})

const dialogRef = ref(null)
const echartsClick = params => dialogRef.value.show(params.name)
</script>