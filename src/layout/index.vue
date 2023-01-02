<template>
    <el-container class="layout-container">
        <Asides/>
        <el-container className="flex-center layout-backtop">
<!--            <Headers v-if="isFixedHeader"/>-->
<!--            <el-scrollbar ref="layoutDefaultsScrollbarRef">-->
<!--                <Headers v-if="!isFixedHeader"/>-->
<!--                <Mains/>-->
<!--            </el-scrollbar>-->
        </el-container>
<!--        <el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop>-->
    </el-container>
</template>

<script setup>
import Asides from '@/layout/component/aside.vue'
</script>
<style scoped>
    .layout-container{
        width: 100%;
        height: 100%;
    }
</style>