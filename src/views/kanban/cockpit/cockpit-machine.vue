<template>
    <layout title="腾冲隆基机加车间驾驶舱" :interval="60000" meanwhile-refresh>
        <layout-column width="50">
            <layout-container height="50" title="产量">
                <yield :factory="factory"/>
            </layout-container>
            <layout-container height="50" title="设备">
                <equipment :factory="factory"/>
            </layout-container>
        </layout-column>
        <layout-column width="50">
            <layout-container height="50" title="在线">
                <online :factory="factory"/>
            </layout-container>
            <layout-container height="50" title="交料">
                <pay-length :factory="factory"/>
            </layout-container>
        </layout-column>
    </layout>
</template>

<script setup>
import Layout from '@/layout/kanban/component/layout.vue'
import LayoutColumn from '@/layout/kanban/component/layout-column.vue'
import LayoutContainer from '@/layout/kanban/component/layout-container.vue'
import Yield from '@/components/kanban/cockpit/machine/yield.vue'
import Equipment from '@/components/kanban/cockpit/machine/equipment.vue'
import Online from '@/components/kanban/cockpit/machine/online.vue'
import PayLength from '@/components/kanban/cockpit/machine/pay-length.vue'
const factory = 'TC'
</script>
