<template>
    <div class="common-layout">
        <el-container>
            <el-aside style="width: auto;height: 100vh;">
                <asides/>
            </el-aside>
            <el-container>
                <el-header style="padding: 0 5px;height: auto;">
                    <headers/>
                </el-header>
                <el-main style="padding: 5px">
                    <router-view v-slot="{ Component }">
                        <keep-alive max="5">
                            <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"/>
                        </keep-alive>
                        <component :is="Component"  v-if="!$route.meta.keepAlive"/>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import Asides from '@/layout/menu/component/aside.vue'
import Headers from '@/layout/menu/component/headers.vue'
</script>
<style scoped>
.layout-container {
    width: 100%;
    height: 100%;
}


.main {
    height: calc(100vh - 50px);
    overflow: auto;
    padding: 10px;
}
</style>