<template>
    <cockpit-dialog :title="title" ref="dialogRef">
        <echarts v-for="index of echartsCount" :key="index" ref="echartsRefs"/>
    </cockpit-dialog>
</template>

<script setup>
import CockpitDialog from '@/components/kanban/cockpit/base/cockpit-dialog.vue'
import Echarts from '@/components/kanban/cockpit/base/echarts.vue'
import {getWaitingTimeByEquipment} from '@/api/cockpit/machine-cockpit'
import {nextTick, ref} from 'vue'
import {getPercent} from '@/assets/common/common'

const props = defineProps({
    factory: String
})
const title = ref('')
const echartsCount = ref(0)
const echartsRefs = ref(null)
const dialogRef = ref(null)
defineExpose({
    show(process) {
        title.value = process + '设备待料（h）'
        dialogRef.value.show((width, height) => {
            getWaitingTimeByEquipment({
                factory: props.factory,
                process
            }, data => {
                let count = Math.ceil(data.length / 20)
                if (count > 4) {
                    count = 4
                }
                echartsCount.value = count

                const rowCount = Math.ceil(data.length / count)
                const eachHeight = height / count
                nextTick(() => {
                    for (let i = 0; i < count; i++) {
                        const start = i * rowCount
                        const end = i * rowCount + rowCount

                        const eachData = data.slice(start, end)
                        const series = []
                        const xAxis = []
                        const map = {}
                        for (let i = 0, len = eachData.length; i < len; i++) {
                            series.push(eachData[i].waiting)
                            xAxis.push(eachData[i].equipment)
                            map[eachData[i].equipment] = getPercent(eachData[i].waiting, eachData[i].total)
                        }
                        const option = {
                            tooltip: {
                                trigger: 'axis'
                            },
                            grid: {
                                left: '3%',
                                right: '3%',
                                bottom: '3%',
                                top: "10%",
                                containLabel: true
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
                                    color: "#FFFFFF"
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
                                    color: "#999999"
                                }
                            },
                            series: {
                                data: series,
                                type: 'bar',
                                areaStyle: {},
                                label: {
                                    show: true,
                                    position: 'top',
                                    color: '#FFFFFF',
                                    fontSize: 8,
                                    formatter: params => {
                                        return params.value + 'h  ' + map[params.name] + '%'
                                    }
                                }
                            }
                        }

                        const echartsRef = echartsRefs.value[i]
                        echartsRef.init(width, eachHeight)
                        echartsRef.refresh(option)
                    }
                })
            })
        })
    }
})
</script>