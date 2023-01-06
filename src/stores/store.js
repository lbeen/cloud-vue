export function getMenusRoutes() {
    const auth = window.localStorage.getItem('auth')
    if (!auth) {
        return []
    }
    const menus = JSON.parse(auth).menus
    if (!menus || menus.length === 0) {
        return []
    }
    const routes = []
    for (let menu of menus) {
        addMenuAndRoute(routes, menu)
    }
    return routes
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