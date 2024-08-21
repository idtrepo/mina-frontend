export default {
    path: '/',
    name: 'autenticacion',
    component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
    children: [
        {
            path: '',
            name: 'autenticacion-login',
            component: () => import('@/modules/auth/views/AuthView.vue')
        }
    ]
}