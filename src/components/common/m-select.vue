<template>
    <el-select v-model="queryParam.factory" clearable placeholder="工厂" style="width: 100px">
        <el-option v-for="(v, k) in selectItems" :key="k" :value="k" :label="v"></el-option>
    </el-select>
</template>

<script setup>
const props = defineProps({
    items: Array || Object
})

const selectItems = []
if (props.items) {
    if (props.items instanceof Array) {
        for (let item of props.items) {
            if (item instanceof Object) {
                selectItems.push(item)
            } else {
                selectItems.push({
                    label:item,
                    value:item
                })
            }
        }
    } else {
        for (const key in props.items) {
            selectItems.push({
                label:props.items[key],
                value:key
            })
        }
    }
}


</script>

<style scoped>

</style>