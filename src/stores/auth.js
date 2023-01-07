import {defineStore} from 'pinia'
import {useThemeConfig} from '@/stores/theme-config'

const EXPIRE_DURATION = 1800000
export const useAuth = defineStore('auth', {
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
    },
    persist: true
})

export function getMenuRoute() {
    const auth = window.localStorage.getItem('auth')
    if (!auth) {
        return []
    }
    const menus = JSON.parse(auth).menus
    if (!menus || menus.length === 0) {
        return []
    }
    const children = [{
        path: '/index',
        name: '/index',
        component: () => import('../views/index.vue'),
        meta: {
            title: '主页'
        }
    }]
    for (let menu of menus) {
        addMenuAndRoute(children, menu)
    }
    return {
        path: '/',
        name: '',
        redirect: '/index',
        component: () => import('@/layout/menu/menu-layout.vue'),
        children
    }
}

function addMenuAndRoute(routes, menu) {
    if (menu.component) {
        routes.push({
            path: menu.path,
            name: menu.name,
            component: () => import('..' + menu.component),
            meta: {
                title: menu.title
            }
        })
        return
    }
    if (!menu.children || menu.children.length === 0) {
        return
    }
    for (let child of menu.children) {
        addMenuAndRoute(routes, child)
    }
}