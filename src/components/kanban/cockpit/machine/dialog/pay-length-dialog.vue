<template>
    <cockpit-echarts-dialog ref="dialogRef"/>
</template>

<script setup>
import CockpitEchartsDialog from '@/components/kanban/cockpit/base/cockpit-echarts-dialog.vue'
import {getPayLengthByReason} from '@/api/cockpit/machine-cockpit'
import {ref} from 'vue'

const props = defineProps({
    factory: String
})

const dialogRef = ref(null)
defineExpose({
    show(process) {
        dialogRef.value.show({
            title: process + '交料（mm）',
            dataFun: getPayLengthByReason,
            param: {
                factory: props.factory,
                process
            },
            optionFun(data, start, end) {
                const xAxis = data.xAxis.slice(start, end)
                const yAxis = data.yAxis.slice(start, end)
                return {
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
                        data: xAxis,
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
                            color: '#999',
                        }
                    },
                    series: {
                        data: yAxis,
                        type: 'bar',
                        areaStyle: {},
                        label: {
                            show: true,
                            position: 'top',
                            color: '#FFFFFF',
                            fontSize: 8
                        }
                    }
                }
            }
        })
    }
})
</script>