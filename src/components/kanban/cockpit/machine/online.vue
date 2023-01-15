<template>
    <echarts ref="echarts" :click-fun="echartsClick"/>
    <online-dialog ref="dialogRef" :factory="factory"/>
</template>

<script setup>
import Echarts from '@/components/kanban/base/echarts.vue'
import OnlineDialog from '@/components/kanban/cockpit/machine/dialog/online-dialog.vue'
import {getOnlineByProcess} from '@/api/kanban/machine-cockpit'
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
    getOnlineByProcess({
        factory: props.factory
    }, data => {
        const legend = ['实际在线', '加工中', '目标在线']
        const xAxis = []
        const series0 = []
        const series1 = []
        const series3 = []

        for (const item of data) {
            xAxis.push(item.process)

            if (item.target === 0 || item.weight + item.in_process <= item.target) {
                series0.push(item.weight)
            } else {
                series0.push({
                    value: item.weight,
                    itemStyle: {
                        color: '#ee6666'
                    },
                })
            }

            series1.push(item.target)
            series3.push(item.in_process)
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
                name: '实际在线',
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
                    formatter: params => {
                        if (typeof params.data === 'object') {
                            return params.data.value <= 0 ? '' : (params.data.value + 't')
                        }
                        return params.data <= 0 ? '' : (params.data + 't')
                    }
                }
            }, {
                name: '加工中',
                type: 'bar',
                // stack: 'weight',
                data: series3,
                xAxisIndex: 1,
                itemStyle: {
                    color: '#91cc75'
                },
                label: {
                    show: true,
                    fontSize: 10,
                    color: '#FFF',
                    position: 'inside',
                    formatter: params => {
                        if (typeof params.data === 'object') {
                            return params.data.value <= 0 ? '' : (params.data.value + 't')
                        }
                        return params.data <= 0 ? '' : (params.data + 't')
                    }
                }
            }, {
                name: '目标在线',
                type: 'bar',
                data: series1,
                itemStyle: {
                    color: '#55649747',
                    borderColor: '#fac858',
                    borderWidth: 1,
                    borderRadius: 0
                },
                label: {
                    show: true,
                    fontSize: 9,
                    color: '#fac858',
                    position: 'top',
                    formatter: params => params.data + 't'
                }
            }, {
                type: 'bar',
                show: false
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