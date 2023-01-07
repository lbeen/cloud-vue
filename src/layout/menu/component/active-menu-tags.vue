<template>
    <el-scrollbar view-class="tags-div" height="50px">
        <el-tag v-for="tag in themeConfig.activeTags"
                :key="tag.title"
                :closable="tag.closable"
                style="margin-right: 5px;cursor: pointer"
                :type="tag.show ? '' :'info'"
                @mouseenter="tagMouseenter(tag)"
                @mouseleave="tagMouseleave(tag)"
                @click="show(tag)"
                size="large"
                effect="light"
        >{{ tag.title }}
        </el-tag>
    </el-scrollbar>
</template>


<script setup>
import {useThemeConfig} from '@/stores/theme-config'
import {useRouter} from 'vue-router'

const themeConfig = useThemeConfig()
const router = useRouter()

const tagMouseenter = tag => tag.closable = true
const tagMouseleave = tag => tag.closable = false
const show = tag => {
    for (const activeTag of themeConfig.activeTags) {
        activeTag.show = activeTag.path === tag.path;
    }
    router.replace(tag.path)
}
</script>
<style>
.tags-div {
    display: flex;
    height: 50px;
    align-items: center;
}
</style>