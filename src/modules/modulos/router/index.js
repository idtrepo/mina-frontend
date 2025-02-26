import { ICONOS } from '@/modules/global/utils/iconos' 
import { PERFILES } from '@/modules/global/utils/perfiles'

export default {
    path: '/modulos',
    name: 'modulos',
    component: () => import('@/modules/modulos/layouts/ModulosLayout.vue'),
    meta: {
        titulo: 'modulos',
        icono: ICONOS.MODULOS,
        perfil: [PERFILES.SUPER_USUARIO, PERFILES.ADMINISTRADOR, PERFILES.SUPERVISOR]
    },
    children: [
        {
            path: '',
            name: 'modulos-listado',
            component: () => import('@/modules/modulos/views/ModulosView.vue')
        },
        {
            path: ':id',
            name: 'modulos-data',
            component: () => import('@/modules/modulos/views/ModulosDataView.vue')
        },
    ]
}