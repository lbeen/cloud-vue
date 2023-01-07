<template>
    <div class="login">
        <div class="login-weaper">
            <div class="login-right">
                <div class="login-main">
                    <h4 class="login-title">MES</h4>
                    <el-form class="el-form login-form" :rules="formData.rules" :model="formData.data" ref="form">
                        <el-form-item prop="username">
                            <el-input v-model="formData.data.username" placeholder="用户名" size="large"/>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="formData.data.password" placeholder="用户名" size="large"
                                      type="password"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="login-submit" size="large" @click="submit">
                                <span>登录</span>
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="vue-particles"/>
    </div>
</template>


<script setup>
import {doLogin} from '@/api/system/login'
import {reactive, ref} from 'vue'
import {useAuth} from '@/stores/auth'
import {useThemeConfig} from '@/stores/theme-config'

const auth = useAuth()
const themeConfig = useThemeConfig()

const formData = reactive({
    data: {
        username: '',
        password: ''
    },
    rules: {
        username: [{
            required: true,
            message: '账户不能为空',
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
            doLogin(formData.data, data => {
                auth.token = data.token
                auth.user = data.user
                auth.menus = data.menus
                window.location.href = '/'
            })
        }
    })
}
</script>

<style scoped lang="scss">
.login {
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    position: relative;

    .vue-particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(ellipse at top left, rgba(105, 155, 200, 1) 0%, rgba(181, 197, 216, 1) 57%);
    }

    .login-weaper {
        margin: auto;
        height: 350px;
        display: flex;
        box-sizing: border-box;
        position: relative;
        z-index: 1;
        border: none;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

        .login-right {
            width: 400px;
            padding: 20px;
            position: relative;
            align-items: center;
            display: flex;
            background-color: #ffffff;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;

            .login-main {
                margin: 0 auto;
                width: 80%;

                .login-title {
                    color: var(--prev-color-text-primary);
                    margin-bottom: 40px;
                    font-weight: 500;
                    font-size: 22px;
                    text-align: center;
                    letter-spacing: 4px;
                }

                .login-form {
                    margin: 10px 0;

                    i {
                        color: var(--prev-color-text-primary);
                    }

                    .el-form-item {
                        margin-bottom: 20px !important;

                        .login-code {
                            display: flex;
                            align-items: center;
                            justify-content: space-around;
                            margin: 0 0 0 10px;
                            user-select: none;

                            .login-code-img {
                                margin-top: 2px;
                                width: 100px;
                                height: 38px;
                                border: 1px solid var(--prev-border-color-base);
                                color: var(--prev-color-text-primary);
                                font-size: 14px;
                                font-weight: 700;
                                letter-spacing: 5px;
                                line-height: 38px;
                                text-indent: 5px;
                                text-align: center;
                                cursor: pointer;
                                transition: all ease 0.2s;
                                border-radius: 4px;

                                &:hover {
                                    border-color: var(--prev-border-color-hover);
                                    transition: all ease 0.2s;
                                }
                            }
                        }

                        .login-submit {
                            width: 100%;
                            letter-spacing: 2px;
                        }
                    }
                }

                .login-menu {
                    margin-top: 30px;
                    width: 100%;
                    text-align: left;

                    a {
                        color: var(--prev-color-text-secondary);
                        font-size: 12px;
                        margin: 0 8px;
                        text-decoration: none;

                        &:hover {
                            color: var(--prev-color-primary);
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
    }
}
</style>
