export default {
    path: '/areas',
    name: 'areas',
    component: () => import('@/modules/areas/layouts/AreasLayout.vue'),
    meta: {
        titulo: 'areas'
    },
    children: [
        {
            path: '',
            name: 'areas-listado',
            component: () => import('@/modules/areas/views/AreasView.vue')
        },
    ]
}