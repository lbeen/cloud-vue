const routes = [{
    path: '/kanban',
    name: '/kanban',
    component: () => import('@/views/kanban/kanban.vue'),
    children: [{
        path: '/kanban/cockpit-machine',
        component: () => import('@/views/kanban/cockpit/cockpit-machine.vue'),
        meta: {
            title: '机加驾驶舱'
        }
    },{
        path: '/kanban/machine/mao-online',
        component: () => import('@/views/kanban/machine/mao-online.vue'),
        meta: {
            title: '毛棒在线看板'
        }
    }]
}]
export default routes
