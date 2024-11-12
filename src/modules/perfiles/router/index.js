import { ICONOS } from '@/modules/global/utils/iconos'

export default {
    path: '/perfiles',
    name: 'perfiles',
    component: () => import('@/modules/perfiles/layouts/PerfilesLayout.vue'),
    meta: {
        icono: ICONOS.PERFILES,
        titulo: 'perfiles'
    },
    children: [
        {
            path: '',
            name: 'perfiles-listado',
            component: () => import('@/modules/perfiles/views/PerfilesView.vue')
        },
        {
            path: ':id',
            name: 'perfiles-data',
            component: () => import('@/modules/perfiles/views/PerfilesDataView.vue')
        },
    ]
}