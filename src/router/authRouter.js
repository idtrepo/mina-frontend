export default {
    path: '/',
    name: 'autenticacion',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
        {
            path: '',
            name: 'autenticacion-login',
            component: () => import('@/views/autenticacion/AutenticacionView.vue')
        }
    ]
}