<template>
    <div class="layout">
        <layout-header ref="head" :title="title">
            <template #left>
                <slot name="headLeft"/>
            </template>
            <template #right>
                <slot name="headRight"/>
            </template>
        </layout-header>
        <slot/>
    </div>
</template>

<script setup>
import '@/assets/kanban/css/layout.css'
import LayoutHeader from '@/layout/kanban/component/layout-header.vue'
import {onMounted, provide} from 'vue'

const props = defineProps({
    title: String,
    interval: {
        type: Number,
        default: 0
    },
    meanwhileRefresh: {
        type: Boolean,
        default: false
    }
})

const children = []
provide('columns', children)
onMounted(() => {
    const width = window.innerWidth - 15 * (children.length + 1)
    const height = window.innerHeight - 85
    for (const child of children) {
        const childWidth = width * parseInt(child.width) / 100
        child.init(childWidth, height)
    }

    if (props.interval > 0) {
        const leafs = []
        getAllLeaf(leafs, children)
        refreshInterval(leafs)
    }
})

const getAllLeaf = (leafs, children) => {
    for (let child of children) {
        if (child.children) {
            getAllLeaf(leafs, child.children)
        } else {
            leafs.push(child)
        }
    }
}

const refreshInterval =leafs => {
    let leafIndex = 0
    setInterval(() => {
        if (props.meanwhileRefresh) {
            for (const leaf of leafs) {
                leaf.refresh()
            }
        } else {
            leafs[leafIndex].refresh()
            if (leafIndex === leafs.length - 1) {
                leafIndex = 0
            } else {
                leafIndex++
            }
        }
    }, props.interval)
}
</script>