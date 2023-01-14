<template>
    <cockpit-echarts-dialog ref="dialogRef"/>
</template>

<script setup>
import CockpitEchartsDialog from '@/components/kanban/cockpit/base/cockpit-echarts-dialog.vue'
import {getMaintenanceTimeByEquipment} from '@/api/cockpit/machine-cockpit'
import {ref} from 'vue'

const props = defineProps({
    factory: String
})

const dialogRef = ref(null)
defineExpose({
    show(process) {
        dialogRef.value.show({
            title: process + '设备故障（h）',
            dataFun: getMaintenanceTimeByEquipment,
            param: {
                factory: props.factory,
                process
            },
            optionFun(data, start, end) {
                const xAxis = data.xAxis.slice(start, end)
                const yAxis = []
                for (let item of data.yAxis) {
                    yAxis.push(item.slice(start, end))
                }
                const series = []
                for (let i = 0, len = data.legend.length; i < len; i++) {
                    series.push({
                        name: data.legend[i],
                        data: yAxis[i],
                        type: 'bar',
                        label: {
                            show: true,
                            color: '#FFFFFF',
                            fontSize: 10,
                            position: 'top',
                            formatter: params => params.value || ''
                        }
                    })
                }
                return  {
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
                        itemWidth: 10,
                        itemHeight: 8,
                        textStyle: {
                            color: '#FFFFFF',
                            fontSize: 10,
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#2D3B53'
                            }
                        },
                        axisLabel: {
                            fontSize: 10,
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
                            fontSize: 8,
                            color: '#999999'
                        }
                    },
                    series: series
                }
            }
        })
    }
})
</script>