const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
        title: '登录',
    },
}]
export default routes
