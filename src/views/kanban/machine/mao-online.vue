<template>
    <layout title="毛棒在线看板" :interval="60000" meanwhile-refresh>
        <layout-column>
            <layout-container title="毛棒在线统计（根）" :title-font-size="titleFontSize" height="40">
                <mao-online-statistics :param="param"/>
            </layout-container>
            <layout-container height="60" split>
                <layout-container-li title="毛棒超3小时在线明细" :title-font-size="titleFontSize">
                    <mao-online-list :param="param" :hours="3"/>
                </layout-container-li>
                <layout-container-li title="毛棒超5小时在线明细" :title-font-size="titleFontSize">
                    <mao-online-list :param="param" :hours="3"/>
                </layout-container-li>
            </layout-container>
        </layout-column>
    </layout>
</template>

<script setup>
import Layout from '@/layout/kanban/component/layout.vue'
import LayoutColumn from '@/layout/kanban/component/layout-column.vue'
import LayoutContainer from '@/layout/kanban/component/layout-container.vue'
import LayoutContainerLi from '@/layout/kanban/component/layout-container-li.vue'

import MaoOnlineStatistics from '@/components/kanban/machine/mao-online-statistics.vue'
import MaoOnlineList from '@/components/kanban/machine/mao-online-list.vue'
import {useRoute} from 'vue-router'

const route = useRoute()
const param = {
    factory: route.query.factory,
    workshop: route.query.workshop
}
const titleFontSize = 14
</script>