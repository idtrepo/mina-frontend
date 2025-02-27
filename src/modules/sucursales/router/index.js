import { ICONOS } from '@/modules/global/utils/iconos';
import { PERFILES } from '@/modules/global/utils/perfiles'

export default {
    path: '/sucursales',
    name: 'sucursales',
    component: () => import('@/modules/sucursales/layouts/SucursalesLayout.vue'),
    meta: {
        titulo: 'sucursales',
        icono: ICONOS.SUCURSALES,
        perfil: [PERFILES.SUPER_USUARIO,PERFILES.ADMINISTRADOR]
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
            meta:{
                perfil:[PERFILES.SUPER_USUARIO, PERFILES.ADMINISTRADOR,PERFILES.SUPERVISOR]
            },
            component: () => import('@/modules/sucursales/views/SucursalesDataView.vue')
        },
        {
            path: ':id',
            name: 'sucursales-info',
            meta:{
                perfil:[PERFILES.SUPER_USUARIO, PERFILES.ADMINISTRADOR, PERFILES.SUPERVISOR]
            },
            component: () => import("@/modules/sucursales/views/SucursalesInfoView.vue")
        }
    ]
}