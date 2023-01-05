import store from '@/stores/store'
import {useAuth} from '@/stores/auth'

const auth = useAuth(store)
let isAddDynamicRoutes = false

export function addMenuRoutes(router) {
    if (isAddDynamicRoutes) {
        return
    }

    const storeMenus = []
    const routes = []
    const menus = auth.menus
    for (let menu of menus) {
        addMenuAndRoute(storeMenus, routes, menu)
    }

    removeDynamicRoutes(router)
    router.addRoute({
        path: '/',
        name: '',
        component: () => import('@/layout/menu/index.vue'),
        children: routes
    })
    isAddDynamicRoutes = true
}

export function removeDynamicRoutes(router) {
    router.removeRoute('/')
}

function addMenuAndRoute(routes, menu) {
    if (menu.component) {
        routes.push({
            path: menu.path,
            name: menu.name,
            component: () => import('@/views/index.vue'),
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