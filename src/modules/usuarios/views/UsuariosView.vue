<template>
    <VListadoView
        :elementos="usuariosListado"
        :resultados="numElementos"
        :obtener-listado = "obtenerUsuarios"
        :reiniciar-data = "reiniciarDataCreacion">
        <template #buscador>
            <UsuariosBuscador/>
        </template>
        <template #formulario>
            <UsuariosForm/>
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, provide, onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import useUsuarios from '../composables/useUsuarios';
import useClientes from '@/modules/clientes/composables/useClientes';
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useAreas from '@/modules/areas/composables/useAreas';

// dependencias
const {obtenerClientes} = useClientes();
const {obtenerSucursales} = useSucursales();
const {obtenerAreas} = useAreas();
const {numElementos, usuariosListado, obtenerUsuarios, reiniciarDataUsuarios, reiniciarDataCreacion} = useUsuarios();
// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const UsuariosForm = defineAsyncComponent(() => import('@/modules/usuarios/components/forms/UsuariosForm.vue'));
const UsuariosBuscador = defineAsyncComponent(() => import('@/modules/usuarios/components/forms/UsuariosBuscador.vue'));

onMounted(() => {
    Promise.allSettled([
        obtenerClientes({params:{ listado: true }}),
        obtenerSucursales({params:{ listado: true }}),
        obtenerAreas({params:{ listado: true }}),
        obtenerUsuarios({params:{ listado: true }})
    ])
        .then(console.log)
        .catch(console.log);
});

onUnmounted(() => {
    reiniciarDataUsuarios();
})
</script>