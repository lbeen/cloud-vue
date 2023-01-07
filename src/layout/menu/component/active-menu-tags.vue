<template>
    <el-scrollbar view-class="tags-div" height="50px">
        <el-tag v-for="(tag, index) in activeTags"
                :key="tag.title"
                :closable="tag.closable"
                style="margin-right: 5px;cursor: pointer"
                :type="tag.show ? '' :'info'"
                @mouseenter="tagMouseenter(tag)"
                @mouseleave="tagMouseleave(tag)"
                @click="show(tag)"
                size="large"
                effect="light"
                @close="closeTag(index)"
        >{{ tag.title }}
        </el-tag>
    </el-scrollbar>
</template>


<script setup>
import {useThemeConfig} from '@/stores/theme-config'
import {useRouter} from 'vue-router'

const activeTags = useThemeConfig().activeTags
const router = useRouter()

const tagMouseenter = tag => {
    if (activeTags.length === 1) {
        return
    }
    tag.closable = true
}
const tagMouseleave = tag => tag.closable = false
const show = tag => {
    for (const activeTag of activeTags) {
        activeTag.show = activeTag.path === tag.path
    }
    router.replace(tag.path)
}
const closeTag = index => {
    if (index < activeTags.length - 1) {
        router.replace(activeTags[index + 1].path)
    } else {
        router.replace(activeTags[index - 1].path)
    }
    activeTags.splice(index, 1)
}
</script>
<style>
.tags-div {
    display: flex;
    height: 50px;
    align-items: center;
}
</style>