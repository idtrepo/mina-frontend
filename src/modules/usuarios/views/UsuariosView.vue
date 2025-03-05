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
import useClientesStore from '@/modules/clientes/stores/useClientesStore';
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore';
import useAreas from '@/modules/areas/composables/useAreas';

// dependencias
const clientesStore = useClientesStore();
const sucursalesStore = useSucursalesStore();
const {obtenerAreas} = useAreas();
const {numElementos, usuariosListado, obtenerUsuarios, reiniciarDataUsuario, reiniciarDataCreacion} = useUsuarios();
// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const UsuariosForm = defineAsyncComponent(() => import('@/modules/usuarios/components/forms/UsuariosForm.vue'));
const UsuariosBuscador = defineAsyncComponent(() => import('@/modules/usuarios/components/forms/UsuariosBuscador.vue'));

onMounted(() => {
    Promise.allSettled([
        clientesStore.obtenerClientes(),
        sucursalesStore.obtenerSucursales(),
        obtenerAreas({params:{ listado: true }}),
        obtenerUsuarios({params:{ listado: true }})
    ])
        .then(console.log)
        .catch(console.log);
});

onUnmounted(() => {
    reiniciarDataUsuario();
})
</script>