import {createRouter, createWebHistory} from 'vue-router'
import store from '@/stores/store'
import {useAuth} from '@/stores/auth'
import {addMenuRoutes} from '@/router/menu-routes'

const auth = useAuth(store)

// 定义静态路由
const staticRoutes = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
        title: '登录',
    },
}]
// const dynamicRoutes = [
//     {
//         path: '/',
//         name: '/',
//         component: () => import('@/layout/menu/index.vue'),
//         // redirect: '/home',
//         meta: {
//             isKeepAlive: true,
//         },
//         children: [{
//             "path": "/index",
//             "name": "index",
//             component: () => import('@/views/index.vue'),
//             "meta": {
//                 "title": "message.router.home",
//                 "isLink": "",
//                 "isHide": false,
//                 "isKeepAlive": true,
//                 "isAffix": true,
//                 "isIframe": false,
//                 "roles": ["admin", "common"],
//                 "icon": "iconfont icon-shouye"
//             }
//         }],
//     }
// ]
const routers = [
    ...staticRoutes,
    // ...dynamicRoutes
]
const router = createRouter({
    history: createWebHistory(),
    routes: routers
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title

    if (to.path === '/login') {
        next()
        return
    }
    if (!auth.token) {
        next('/login')
        return
    }

    addMenuRoutes(router)
    next()
})

export default router
