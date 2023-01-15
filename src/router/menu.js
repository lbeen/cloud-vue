import {getMenusFromStorage} from '@/stores/auth'

const routes = [{
    path: '/',
    name: '',
    redirect: '/index',
    component: () => import('@/layout/menu/menu-layout.vue'),
    children: getMenuRoute()
}]

function getMenuRoute() {
    const children = [{
        path: '/index',
        name: '/index',
        component: () => import('../views/index.vue'),
        meta: {
            title: '主页'
        }
    }]

    const menus = getMenusFromStorage()
    for (let menu of menus) {
        addMenuAndRoute(children, menu)
    }

    return children
}

function addMenuAndRoute(routes, menu) {
    if (menu.component) {
        routes.push({
            path: menu.path,
            name: menu.name,
            component: () => import('..' + menu.component),
            meta: {
                title: menu.title,
                keepAlive: menu.keepAlive
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

export default routes
