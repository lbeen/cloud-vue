<template>
    <echarts ref="echarts"/>
</template>

<script setup>
import Echarts from '@/components/kanban/base/echarts.vue'
import {getMaoOnlineStatistics} from '@/api/kanban/machine'
import {inject, ref} from 'vue'

const props = defineProps({
    param: Object
})

const echarts = ref(null)
const init = (width, pHeight) => {
    echarts.value.init(width, pHeight)
    refresh()
}
const refresh = () => {
    getMaoOnlineStatistics(props.param, data => {
        const series = []
        for (let i = 0, len = data.legend.length; i < len; i++) {
            series.push({
                name: data.legend[i],
                data: data.yAxis[i],
                type: 'bar',
                label: {
                    show: true,
                    color: '#FFFFFF',
                    position: 'top'
                }
            })
        }
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                top: '10%',
                containLabel: true
            },
            legend: {
                data: data.legend,
                textStyle: {
                    color: '#FFFFFF'
                }
            },
            xAxis: {
                type: 'category',
                data: data.xAxis,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#2D3B53'
                    }
                },
                axisLabel: {
                    color: '#FFFFFF'
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#2D3B53'
                    }
                },
                axisLabel: {
                    color: '#999999'
                }
            },
            series: series
        }
        echarts.value.refresh(option)
    })
}

const leafs = inject('leafs')
leafs.push({
    init,
    refresh
})
</script>