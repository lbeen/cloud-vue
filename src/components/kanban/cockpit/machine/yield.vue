<template>
    <echarts ref="echarts" :click-fun="echartsClick"/>
    <yield-dialog ref="dialogRef" :factory="factory"/>
</template>

<script setup>
import Echarts from '@/components/kanban/cockpit/base/echarts.vue'
import YieldDialog from '@/components/kanban/cockpit/machine/dialog/yield-dialog.vue'
import {getYieldByProcess} from '@/api/cockpit/machine-cockpit'
import {getPercent} from '@/assets/common/common'
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
    getYieldByProcess({
        factory: props.factory
    }, data => {
        const legend = ['实际产量', '产能', '产能利用率']
        const xAxis = []
        const series0 = []
        const series1 = []
        const series2 = []

        for (const item of data) {
            xAxis.push(item.process)
            series0.push(item.yield)
            series1.push(item.capacity)
            series2.push(getPercent(item.yield, item.capacity))
        }

        const option = {
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                top: '3%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legend,
                itemWidth: 12,
                itemHeight: 10,
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 8
                }
            },
            yAxis: [{
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: '#2D3B53'
                    }
                },
                axisLabel: {
                    fontSize: 8,
                    color: '#999999'
                }
            }, {
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLabel: {
                    fontSize: 8,
                    color: '#999999',
                    formatter: params => params + '%'
                }
            }],
            xAxis: [{
                type: 'category',
                data: xAxis,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#2D3B53'
                    }
                },
                axisLabel: {
                    color: '#FFFFFF'
                }
            }, {
                type: 'category',
                data: xAxis,
                show: false
            }],
            series: [{
                name: '实际产量',
                type: 'bar',
                data: series0,
                xAxisIndex: 1,
                itemStyle: {
                    color: '#5470c6'
                },
                label: {
                    show: true,
                    fontSize: 10,
                    color: '#FFF',
                    position: 'inside',
                    formatter: params => params.data + 't'
                }
            }, {
                name: '产能',
                type: 'bar',
                data: series1,
                itemStyle: {
                    color: '#55649747',
                    borderColor: '#fac858',
                    borderWidth: 1,
                    borderRadius: 0,
                    borderType: 'dotted'
                },
                label: {
                    show: true,
                    fontSize: 9,
                    color: '#fac858',
                    position: 'top',
                    formatter: params => params.data + 't'
                }
            }, {
                name: '产能利用率',
                type: 'line',
                yAxisIndex: 1,
                data: series2,
                label: {
                    show: true,
                    color: '#91cc75',
                    position: 'right',
                    fontSize: 9,
                    distance: 10,
                    offset: [0, 10],
                    formatter: params => params.data + '%'
                },
                itemStyle: {
                    color: '#91cc75',
                },
                lineStyle: {
                    radius: 0,
                    width: 1,
                    type: 'dotted',
                    color: '#91cc75'
                }
            }]
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