<template>
    <echarts ref="echarts" :click-fun="echartsClick"/>
    <equipment-maintenance-dialog ref="maintenanceDialog" :factory="factory"/>
    <equipment-waiting-dialog ref="waitingDialog" :factory="factory"/>
</template>

<script setup>
import Echarts from '@/components/kanban/cockpit/base/echarts.vue'
import EquipmentMaintenanceDialog from '@/components/kanban/cockpit/machine/dialog/equipment-maintenance-dialog.vue'
import EquipmentWaitingDialog from '@/components/kanban/cockpit/machine/dialog/equipment-waiting-dialog.vue'

import {getEquipmentByProcess} from '@/api/cockpit/machine-cockpit'
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
    getEquipmentByProcess({
        factory: props.factory
    }, data => {
        const legend = ['待料', '故障']
        const xAxis = []
        const series1 = []
        const series2 = []

        const timePercent = {}
        for (const item of data) {
            xAxis.push(item.process)
            if (item.process === '小切断') {
                series1.push(0)
            } else {
                timePercent[item.process] = {
                    '待料': getPercent(item.waiting, item.waitingTotal),
                    '故障': getPercent(item.maintenance, item.maintenanceTotal)
                }
                series1.push(item.waiting)
            }
            series2.push(item.maintenance)
        }

        const option = {
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                top: '15%',
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
            }],
            series: [{
                name: '待料',
                // stack: 'time',
                type: 'bar',
                data: series1,
                itemStyle: {
                    color: '#91cc75'
                },
                label: {
                    show: true,
                    fontSize: 9,
                    color: '#FFF',
                    position: 'top',
                    formatter: params => getValueAndPercent(params, timePercent)
                }
            }, {
                name: '故障',
                // stack: 'time',
                type: 'bar',
                data: series2,
                itemStyle: {
                    color: '#ee6666'
                },
                label: {
                    show: true,
                    fontSize: 10,
                    color: '#FFF',
                    position: 'top',
                    formatter: params => getValueAndPercent(params, timePercent)
                }
            }]
        }
        echarts.value.refresh(option)
    })
}

const getValueAndPercent=(params, timePercent)=> {
    if (!params.data) {
        return ''
    }
    let label = params.data + 'h'
    const process = timePercent[params.name]
    if (!process) {
        return label
    }
    const percent = process[params.seriesName]
    if (!percent) {
        return label
    }
    return label + '  ' + percent + '%'
}

const leafs = inject('leafs')
leafs.push({
    init,
    refresh
})

const maintenanceDialog = ref(null)
const waitingDialog = ref(null)
const echartsClick = params => {
    if (params.seriesName === '待料') {
        waitingDialog.value.show(params.name)
    } else {
        maintenanceDialog.value.show(params.name)
    }
}
</script>