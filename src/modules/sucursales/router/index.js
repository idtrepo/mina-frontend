export default {
    path: '/sucursales',
    name: 'sucursales',
    component: () => import('@/modules/sucursales/layouts/SucursalesLayout.vue'),
    meta: {
        titulo: 'sucursales'
    },
    children: [
        {
            path: '',
            name: 'sucursales-listado',
            component: () => import('@/modules/sucursales/views/SucursalesView.vue')
        },
    ]
}