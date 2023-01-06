<template>
    <el-header class="layout-header">
        <div class="layout-header-div">
            <div class="layout-header-left">
                <div style="width: 40px;text-align: center">
                    <component :is="themeConfig.isCollapseMenu ? 'expand' : 'fold'" style="width: 18px;cursor: pointer;"
                               @click="changeMenuCollapse"/>
                </div>
                <active-menu-tags style="margin-left: 5px"/>
            </div>
            <div class="layout-header-right">
                <div style="width: 80px;text-align: center">
                    <el-dropdown>
                        <span>
                            {{ userInfo.username }}
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
    <el-dialog v-model="showChangePassword" title="修改密码" width="300px">
        <el-form :rules="formData.rules" :model="formData.data" ref="form">
            <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="formData.data.username" size="large" readonly></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model.trim="formData.data.password" size="large"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 10px">
                <el-button style="width: 100%" type="primary" @click="submit" size="large">修改</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {useThemeConfig} from '@/stores/theme-config'
import {useAuth} from '@/stores/auth'
import ActiveMenuTags from '@/layout/menu/component/active-menu-tags.vue'
import {changePassword} from '@/api/system/user'

const themeConfig = useThemeConfig()
const changeMenuCollapse = () => themeConfig.isCollapseMenu = !themeConfig.isCollapseMenu

const auth = useAuth()
const userInfo = auth.user || {}

const logonOut = () => {
    auth.removeToken()
    window.location.href = '/login'
}

const showChangePassword = ref(false)
const formData = reactive({
    data: {
        username: userInfo.username,
        password: ''
    },
    rules: {
        username: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        }],
        password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        }]
    }
})

const form = ref(null)
const submit = () => {
    form.value.validate(valid => {
        if (valid) {
            changePassword(formData.data, () => showChangePassword.value = false)
        }
    })
}
</script>
<style scoped>
.layout-header {
    padding: 0;
    width: 100%;
    height: 50px;
}

.layout-header-div {
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f1f2f3;
}

.layout-header-left {
    flex: 1;
    height: inherit;
    display: flex;
    align-items: center;
    width: 1px;
    margin-right: 100px;
}

.layout-header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>