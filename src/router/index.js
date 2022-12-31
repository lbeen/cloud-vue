import {createRouter, createWebHistory} from 'vue-router'

// 定义静态路由
const staticRoutes = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
        title: '登录',
    },
}]
const dynamicRoutes = [
    {
        path: '/',
        name: '/',
        component: () => import('@/layout/index.vue'),
        // redirect: '/home',
        meta: {
            isKeepAlive: true,
        },
        children: [{
            path: '/index',
            name: 'index',
            component: () => import('@/views/index.vue'),
            meta: {
                title: '首页',
            },
        }],
    }
]
const routers = [
    ...staticRoutes,
    ...dynamicRoutes
]
const router = createRouter({
    history: createWebHistory(),
    routes: routers
})

export default router
