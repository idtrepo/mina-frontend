import { ICONOS } from '@/modules/global/utils/iconos'
import { PERFILES } from '@/modules/global/utils/perfiles'

export default {
    path: '/clientes',
    name: 'clientes',
    component: () => import('@/modules/clientes/layouts/ClientesLayout.vue'),
    meta: {
        titulo: 'clientes',
        icono: ICONOS.CLIENTES,
        perfil: [PERFILES.SUPER_USUARIO]
    },
    children: [
        {
            path: '',
            name: 'clientes-listado',
            component: () => import('@/modules/clientes/views/ClientesView.vue')
        },
        {
            path: ':id',
            name: 'clientes-data',
            component: () => import('@/modules/clientes/views/ClientesDataView.vue')
        },
    ]
}