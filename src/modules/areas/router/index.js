import { ICONOS } from '@/modules/global/utils/iconos'

export default {
    path: '/areas',
    name: 'areas',
    component: () => import('@/modules/areas/layouts/AreasLayout.vue'),
    meta: {
        titulo: 'areas',
        icono: ICONOS.AREAS
    },
    children: [
        {
            path: '',
            name: 'areas-listado',
            component: () => import('@/modules/areas/views/AreasView.vue')
        },
        {
            path: ':id',
            name: 'areas-data',
            component: () => import('@/modules/areas/views/AreasDataView.vue')
        },
    ]
}