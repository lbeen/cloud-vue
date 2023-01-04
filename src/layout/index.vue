<template>
    <el-container class="layout-container">
        <asides/>
        <el-container>
            <headers/>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
<!--            <el-scrollbar ref="layoutDefaultsScrollbarRef">-->
<!--                <Headers v-if="!isFixedHeader"/>-->
<!--                <Mains/>-->
<!--            </el-scrollbar>-->
        </el-container>
    </el-container>
</template>

<script setup>
import Asides from '@/layout/component/aside.vue'
import Headers from '@/layout/component/headers.vue'
</script>
<style scoped>
    .layout-container{
        width: 100%;
        height: 100%;
    }


    .main {
        height: calc(100vh - 50px);
        overflow: auto;
        padding: 10px;
    }
</style>