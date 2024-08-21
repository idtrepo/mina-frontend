import { SIMBOLO } from '@/modules/global/utils/simbolos'
import { TITULO } from '@/modules/global/utils/titulo'

export default {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('@/modules/usuarios/layouts/UsuariosLayout.vue'),
    meta: {
        titulo: TITULO.USUARIOS,
        simbolo: SIMBOLO.USUARIOS
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