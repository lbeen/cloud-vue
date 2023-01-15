import {createRouter, createWebHistory} from 'vue-router'
import {useAuth} from '@/stores/auth'
import {useThemeConfig} from '@/stores/theme-config'

import staticRoutes from '@/router/static'
import kanbanRoutes from '@/router/kanban'
import menusRoutes from '@/router/menu'

const routers = [
    ...staticRoutes,
    ...kanbanRoutes,
    ...menusRoutes
]
const router = createRouter({
    history: createWebHistory(),
    routes: routers
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.path === '/login' || to.path.startsWith('/kanban')) {
        next()
        return
    }

    if (!useAuth().token) {
        next('/login')
        return
    }
    useThemeConfig().addTag({
        path: to.fullPath,
        title: to.meta.title
    })
    next()
})

export default router
