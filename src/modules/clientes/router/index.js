export default {
    path: '/clientes',
    name: 'clientes',
    component: () => import('@/modules/clientes/layouts/ClientesLayout.vue'),
    meta: {
        titulo: 'clientes'
    },
    children: [
        {
            path: '',
            name: 'clientes-listado',
            component: () => import('@/modules/clientes/views/ClientesView.vue')
        },
    ]
}