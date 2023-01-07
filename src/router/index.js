import {createRouter, createWebHistory} from 'vue-router'
import {useAuth, getMenuRoute} from '@/stores/auth'
import {useThemeConfig} from '@/stores/theme-config'

// 定义静态路由
const staticRoutes = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/system/login.vue'),
    meta: {
        title: '登录',
    },
}]

const menuRoute = getMenuRoute()
const dynamicRoutes = [menuRoute]

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

    useThemeConfig().addTag({
        path:to.fullPath,
        title:to.meta.title
    })
    next()
})

export default router
