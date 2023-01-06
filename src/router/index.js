import {createRouter, createWebHistory} from 'vue-router'
import {useAuth} from '@/stores/auth'
import {getMenusRoutes} from '@/stores/store'

// 定义静态路由
const staticRoutes = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/system/login.vue'),
    meta: {
        title: '登录',
    },
}]

const menuRoutes = getMenusRoutes()
const dynamicRoutes = [{
    path: '/',
    name: '',
    component: () => import('@/layout/menu/menu-layout.vue'),
    children: menuRoutes
}]

const routers = [
    ...staticRoutes,
    ...dynamicRoutes
]
const router = createRouter({
    history: createWebHistory(),
    routes: routers
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    const auth = useAuth()
    if (to.path === '/login') {
        next()
        return
    }
    if (!auth.token) {
        next('/login')
        return
    }
    next()
})

export default router
