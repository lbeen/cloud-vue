<template>
<!--    <el-container class="layout-container">-->
<!--        <asides/>-->
<!--        <el-container>-->
<!--            <headers/>-->
<!--            <el-main class="main">-->
<!--                <router-view></router-view>-->
<!--            </el-main>-->
<!--&lt;!&ndash;            <el-scrollbar ref="layoutDefaultsScrollbarRef">&ndash;&gt;-->
<!--&lt;!&ndash;                <Headers v-if="!isFixedHeader"/>&ndash;&gt;-->
<!--&lt;!&ndash;                <Mains/>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-scrollbar>&ndash;&gt;-->
<!--        </el-container>-->
<!--    </el-container>-->

    <div class="common-layout">
        <el-container>
            <el-aside style="width: auto;height: 100vh;"><asides/></el-aside>
            <el-container>
                <el-header style="padding: 0 5px;height: auto;"><headers/></el-header>
                <el-main style="padding: 0"><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
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