<template>
    <el-menu router :default-active="defaultActive" :collapse="themeConfig.isCollapseMenu" active-text-color="#ffd04b"
             background-color="#545c64" text-color="#fff">
        <el-menu-item index="/index">
            <el-icon>
                <house/>
            </el-icon>
            <template #title>
                <span>主页</span>
            </template>
        </el-menu-item>
        <sub-menu v-for="(menu, index) in auth.menus" :menu="menu" :index="index.toString()"/>
    </el-menu>
</template>

<script setup>
import {useThemeConfig} from '@/stores/theme-config'
import {useAuth} from '@/stores/auth'
import SubMenu from '@/layout/menu/component/sub-menu.vue'
import {useRouter} from 'vue-router'

const themeConfig = useThemeConfig()
const auth = useAuth()

const router = useRouter()
const defaultActive = router.currentRoute.value.fullPath
</script>

<style scoped>
.el-menu {
    height: 100vh;
}

.el-menu:not(.el-menu--collapse) {
    width: 200px;
}

.el-icon{
    font-size: 14px;
}
</style>