export default {
    path: '/modulos',
    name: 'modulos',
    component: () => import('@/layouts/ModulosLayout.vue'),
    children: [
        {
            path: '',
            name: 'modulos-listado',
            component: () => import('@/views/modulos/ModulosView.vue')
        }
    ]
}