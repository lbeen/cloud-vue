<template>
    <el-scrollbar view-class="tags-div" height="50px">
        <el-tag
                v-for="tag in tags"
                :key="tag.title"
                :closable="tag.closable"
                style="margin-right: 5px"
                type="info"
                @mouseenter="tagMouseenter($event, tag)"
                @mouseleave="tagMouseleave($event, tag)"
        >{{ tag.title }}
        </el-tag>
    </el-scrollbar>
</template>


<script setup>
import {reactive} from 'vue'

const tags = reactive([])
for (let i = 0; i < 20; i++) {
    tags.push({
        title: 'tag' + (i + 1) + 'tag' + (i + 1),
        closable: false,
        selected: false
    })
}

const tagMouseenter = ($event, tag) =>  tag.closable = true
const tagMouseleave = ($event, tag) =>  tag.closable = true
</script>
<style>
.tags-div {
    display: flex;
    height: 50px;
    align-items: center;
}
</style>