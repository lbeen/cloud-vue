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
            "path": "/index",
            "name": "index",
            component: () => import('@/views/index.vue'),
            "meta": {
                "title": "message.router.home",
                "isLink": "",
                "isHide": false,
                "isKeepAlive": true,
                "isAffix": true,
                "isIframe": false,
                "roles": ["admin", "common"],
                "icon": "iconfont icon-shouye"
            }
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
