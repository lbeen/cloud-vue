<template>
    <div class="layout-container" :style="{width: containerWidth + 'px', height: containerHeight + 'px'}">
        <div v-if="title" class="name-title" :style="{height: titleHeight + 'px', fontSize: titleFontSize + 'px'}">
            {{ title }}
        </div>
        <slot v-if="!split"/>
        <ul v-else class="teacher-pie clearfix">
            <slot/>
        </ul>
        <span class="top-left border-span"></span>
        <span class="top-right border-span"></span>
        <span class="bottom-left border-span"></span>
        <span class="bottom-right border-span"></span>
    </div>
</template>

<script setup>
import {inject, provide, ref} from 'vue'

const props = defineProps({
    title: {
        type: String
    },
    titleFontSize: {
        type: Number,
        default: 12
    },
    split: {
        type: Boolean,
        default: false
    },
    height: {
        type: String,
        default: '100'
    }
})

const titleHeight = ref(16)
const containerWidth = ref(0)
const containerHeight = ref(0)

const children = []
if (props.split) {
    provide('containerLis', children)
} else {
    provide('leafs', children)
}

const containers = inject('containers')
containers.push({
    height: props.height,
    init: (width, height) => {
        containerWidth.value = width
        containerHeight.value = height

        if (props.split) {
            width -= 2
            for (let child of children) {
                const liWidth = width * parseInt(child.width) / 100
                child.init(liWidth, height)
            }
        } else if (children.length > 0){
            width -= 10
            children[0].init(width, height - titleHeight.value - 3)
        }
    },
    children
})
</script>