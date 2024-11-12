import { ICONOS } from '@/modules/global/utils/iconos'

export default {
    path: '/sucursales',
    name: 'sucursales',
    component: () => import('@/modules/sucursales/layouts/SucursalesLayout.vue'),
    meta: {
        titulo: 'sucursales',
        icono: ICONOS.SUCURSALES
    },
    children: [
        {
            path: '',
            name: 'sucursales-listado',
            component: () => import('@/modules/sucursales/views/SucursalesView.vue')
        },
        {
            path: ':id',
            name: 'sucursales-data',
            component: () => import('@/modules/sucursales/views/SucursalesDataView.vue')
        },
    ]
}