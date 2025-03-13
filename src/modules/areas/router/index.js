import { ICONOS } from '@/modules/global/utils/iconos';
import { PERFILES } from '@/modules/global/utils/perfiles'

export default {
    path: '/areas',
    name: 'areas',
    component: () => import('@/modules/areas/layouts/AreasLayout.vue'),
    meta: {
        titulo: 'areas',
        icono: ICONOS.AREAS,
        perfil: [PERFILES.SUPER_USUARIO, PERFILES.ADMINISTRADOR]
    },
    children: [
        {
            path: '',
            name: 'areas-listado',
            meta:{
                perfil: [PERFILES.SUPER_USUARIO, PERFILES.ADMINISTRADOR, PERFILES.SUPERVISOR]
            },
            component: () => import('@/modules/areas/views/AreasView.vue')
        },
        {
            path: ':id',
            name: 'areas-listado-nest',
            meta:{
                perfil: [PERFILES.SUPER_USUARIO, PERFILES.ADMINISTRADOR, PERFILES.SUPERVISOR]
            },
            component: () => import('@/modules/areas/views/AreasView.vue')
        },
        {
            path: ':id',
            name: 'areas-data',
            component: () => import('@/modules/areas/views/AreasDataView.vue')
        },
        {
            path: 'modulos/:id',
            name: 'areas-info',
            meta:{
                perfil: [PERFILES.SUPER_USUARIO, PERFILES.ADMINISTRADOR, PERFILES.SUPERVISOR]
            },
            component: () => import('@/modules/areas/views/AreasInfoView.vue')
        },
    ]
}