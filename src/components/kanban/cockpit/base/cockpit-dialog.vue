<template>
    <el-dialog :title="title" v-model="visible" :width="width + '%'" destroy-on-close center
               :top="(100 - height)/2 + 'vh'">
        <border-box12 :style="{height: containerHeight + 'px',width: containerWidth + 'px'}">
            <slot/>
        </border-box12>
    </el-dialog>
</template>

<script setup>
import { BorderBox12 } from '@kjgl77/datav-vue3'
import {ref} from 'vue'

const props = defineProps({
    title: String,
    width: {
        type: Number,
        default: 80
    },
    height: {
        type: Number,
        default: 80
    },
    afterShow: Function
})

const visible = ref(false)
const containerWidth = ref(0)
const containerHeight = ref(0)
const show = callBack => {
    containerWidth.value = window.innerWidth * props.width / 100
    containerHeight.value = window.innerHeight * props.height / 100 - 54
    visible.value = true
    if (callBack) {
        callBack(containerWidth.value, containerHeight.value)
    }
}

defineExpose({
    show
})
</script>
<style>
.el-dialog{
    background-color: #040f3c;
}

.el-dialog__header {
    padding: 10px 10px 10px 10px;
}

.el-dialog__header .el-dialog__title {
    color: #1ccccf;
}

.el-dialog__body {
    padding: 0 !important;
}
</style>