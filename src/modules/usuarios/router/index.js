import { ICONOS } from '@/modules/global/utils/iconos'
import { TITULO } from '@/modules/global/utils/titulo';
import { PERFILES } from '@/modules/global/utils/perfiles'

export default {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('@/modules/usuarios/layouts/UsuariosLayout.vue'),
    meta: {
        titulo: TITULO.USUARIOS,
        icono: ICONOS.USUARIOS,
        perfil:[PERFILES.SUPER_USUARIO, PERFILES.SUPERVISOR, PERFILES.ADMINISTRADOR]
    },
    children: [
        {
            path: '',
            meta:{
                perfil:[PERFILES.SUPER_USUARIO, PERFILES.SUPERVISOR,PERFILES.ADMINISTRADOR]
            },
            name: 'usuarios-listado',
            component: () => import('@/modules/usuarios/views/UsuariosView.vue')
        },
        {
            path: ':id',
            name: 'usuarios-data',
            meta:{
                perfil:[PERFILES.SUPER_USUARIO, PERFILES.SUPERVISOR,PERFILES.ADMINISTRADOR]
            },
            component: () => import('@/modules/usuarios/views/UsuariosDataView.vue')
        },
    ]
}