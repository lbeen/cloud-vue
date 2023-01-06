import {defineStore} from 'pinia'
import {useThemeConfig} from '@/stores/theme-config'

const EXPIRE_DURATION = 1800000
export const useAuth = defineStore('auth', {
    persist: true,
    state: () => {
        return {
            token: '',
            user: {},
            lastTime: '',
            menus: []
        }
    },
    actions: {
        removeToken() {
            this.token = ''
            this.user = {}
            this.lastTime = {}
            this.menus = []
            useThemeConfig().reset()
        },
        checkLoginExpire() {
            if (!this.lastTime) {
                return true
            }
            return new Date().getTime() - new Date(this.lastTime).getTime() > EXPIRE_DURATION
        }
    }
})