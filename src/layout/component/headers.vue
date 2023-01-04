<template>
    <el-header class="layout-header">
        <div class="layout-header-div">
            <div class="layout-header-left">
                <div style="width: 40px;text-align: center">
                    <component :is="themeConfig.isCollapseMenu ? 'expand' : 'fold'" style="width: 18px;cursor: pointer;"
                               @click="changeMenuCollapse"/>
                </div>
                <active-menu-tags/>
            </div>
            <div class="layout-header-right">
                <div style="width: 80px;text-align: center">
                    <el-dropdown>
                        <span>
                            admin
                          <el-icon>
                            <arrow-down/>
                          </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>
                                    <el-button type="primary" @click="showChangePassword = true">修改密码</el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button type="danger" style="width: 100%" @click="logonOut">退出</el-button>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>

            </div>
        </div>
    </el-header>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useThemeConfig} from '@/stores/themeConfig'
import {ref} from 'vue'
import ActiveMenuTags from '@/layout/component/ActiveMenuTags.vue'

const {themeConfig} = storeToRefs(useThemeConfig())
const changeMenuCollapse = () => themeConfig.value.isCollapseMenu = !themeConfig.value.isCollapseMenu

const breadcrumbList = ref([{}])
</script>
<style scoped>
.layout-header {
    padding: 0;
    width: 100%;
    height: auto;
}

.layout-header-div {
    height: 50px;
    display: flex;
    align-items: center;
    /*background: var(--next-bg-topBar);*/
    border-bottom: 1px solid #f1f2f3;
}

.layout-header-left {
    flex: 1;
    height: inherit;
    display: flex;
    align-items: center;
}

.layout-header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>