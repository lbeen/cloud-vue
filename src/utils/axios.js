import axios from 'axios'
import router from '@/router'
import Tips from '@/utils/Tips'
import {useAuth} from '@/stores/auth'

const auth = useAuth()

const instance = axios.create({
    baseURL: '/api',
    timeout: 300000
})

instance.interceptors.request.use(config => {
        config.headers.token = auth.token || ''
        return config
    },
    error => Promise.reject(error)
)
instance.interceptors.response.use(response => {
    const code = response.data.code
    if (code === 401) {
        if (auth.checkLoginExpire()) {
            jumpToLogin()
            return
        }
        return instance.post('/system/refreshToken', auth.user).then(response2 => {
            const token = response2.data.data
            if (token) {
                auth.token = token
                response.config.headers.token = token
                return instance(response.config)
            }

            jumpToLogin()
        }).catch(jumpToLogin)
    }

    auth.lastTime = response.headers.date
    return Promise.resolve(response)
}, error => {
    const status = error.response.status
    if (status === 401) {
        jumpToLogin()
        return
    }
    return Promise.reject(error)
})

function jumpToLogin() {
    Tips.alert({
        message:'未登录或者登录过期，请重新登录',
        okFun: () => router.replace('/login')
    })
}

export default instance