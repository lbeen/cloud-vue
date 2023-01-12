<template>
    <el-select v-model="state.value" :clearable="clearable" :placeholder="placeholder">
        <el-option v-for="item in state.selectItems" :key="item.value" :value="item.value" :label="item.label"/>
    </el-select>
</template>

<script setup>
import {reactive, watch} from 'vue'

const props = defineProps({
    modelValue: [String, Number],
    items: [Array, Object],
    placeholder: String,
    clearable: {
        type: Boolean,
        default: false
    }
})

const state = reactive({
    selectItems: [],
    value: props.modelValue
})
const createSelectItems = () => {
    const newItems = []
    if (props.items) {
        if (props.items instanceof Array) {
            for (let item of props.items) {
                if (item instanceof Object) {
                    newItems.push(item)
                } else {
                    newItems.push({
                        label: item,
                        value: item
                    })
                }
            }
        } else {
            for (const key in props.items) {
                newItems.push({
                    label: props.items[key],
                    value: key
                })
            }
        }
    }
    state.selectItems = newItems
}
createSelectItems()
watch(() => props.items, createSelectItems, {deep: true})

const emit = defineEmits(['update:modelValue'])
watch(() => state.value, newValue => emit('update:modelValue', newValue))

watch(() => props.modelValue, newValue => state.value = newValue)
</script>