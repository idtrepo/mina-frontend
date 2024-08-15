export default {
    path: '/modulos',
    name: 'modulos',
    component: () => import('@/layouts/ModulosLayout.vue'),
    children: [
        {
            path: '',
            name: 'modulos-listado',
            component: () => import('@/views/modulos/ModulosView.vue')
        },
        {
            path: ':id',
            name: 'modulos-data',
            component: () => import('@/views/modulos/ModulosDataView.vue')
        },
    ]
}