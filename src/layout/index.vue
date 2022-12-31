<template>
    <el-container class="layout-container">
        <asides />
        <el-container class="flex-center layout-backtop">
            <headers/>
            <el-scrollbar ref="layoutDefaultsScrollbarRef">
                <headers  />
                <Mains />
            </el-scrollbar>
        </el-container>
        <el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop>
    </el-container>
</template>

<script setup>
import Asides from '@/layout/component/aside.vue';
import Headers from '@/layout/component/header.vue';
import Mains from '@/layout/component/main.vue';
</script>
