<template>
    <el-sub-menu v-if="props.menu.children && props.menu.children.length > 0" :index="index">
        <template #title v-if="menu.icon">
            <i class="el-icon">
                <component :is="menu.icon"/>
            </i>
            <span>{{ menu.title }}</span>
        </template>
        <sub-menu v-for="(child,childIndex) in props.menu.children" :menu="child" :index="index + '-' + childIndex"></sub-menu>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path">
        <i v-if="menu.icon" class="el-icon">
            <component :is="menu.icon"/>
        </i>
        <template #title>
            <span>{{ menu.title }}</span>
        </template>
    </el-menu-item>
</template>

<script setup>
const props = defineProps({
    menu: Object,
    index:String
})
</script>

<style scoped>
.el-icon{
    font-size: 14px;
}
</style>