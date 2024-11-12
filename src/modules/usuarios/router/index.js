import { ICONOS } from '@/modules/global/utils/iconos'
import { TITULO } from '@/modules/global/utils/titulo'

export default {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('@/modules/usuarios/layouts/UsuariosLayout.vue'),
    meta: {
        titulo: TITULO.USUARIOS,
        icono: ICONOS.USUARIOS
    },
    children: [
        {
            path: '',
            name: 'usuarios-listado',
            component: () => import('@/modules/usuarios/views/UsuariosView.vue')
        },
        {
            path: ':id',
            name: 'usuarios-data',
            component: () => import('@/modules/usuarios/views/UsuariosDataView.vue')
        },
    ]
}