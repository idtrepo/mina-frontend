import { PERFILES } from '@/modules/global/utils/perfiles'

export default {
    path: '/',
    name: 'autenticacion',
    component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
    meta: {
        perfil: [PERFILES.SUPER_USUARIO, PERFILES.ADMINISTRADOR, PERFILES.SUPERVISOR]
    },
    children: [
        {
            path: '',
            name: 'autenticacion-login',
            component: () => import('@/modules/auth/views/AuthView.vue')
        }
    ]
}