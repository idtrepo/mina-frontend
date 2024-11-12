<template>
    <VListadoView
        :elementos="usuariosListado"
        :resultados="numResultados">
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
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue'
import useUsuariosStore from '../stores/useUsuariosStore';
import useClientesStore from '@/modules/clientes/stores/useClientesStore';
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore';
import useAreasStore from '@/modules/areas/stores/useAreasStore';

// dependencias
const clientesStore = useClientesStore();
const sucursalesStore = useSucursalesStore();
const areasStore = useAreasStore();
const usuariosStore = useUsuariosStore();
const { usuariosListado, numResultados, filtros, filtroActivo } = storeToRefs(usuariosStore);

// componentes
const VListadoView = defineAsyncComponent(() => import('@/modules/global/views/VListadoView.vue'));
const UsuariosForm = defineAsyncComponent(() => import('@/modules/usuarios/components/forms/UsuariosForm.vue'));
const UsuariosBuscador = defineAsyncComponent(() => import('@/modules/usuarios/components/forms/UsuariosBuscador.vue'));

// hooks
provide('filtros', {
    filtros,
    filtroActivo,
    obtenerElementos: usuariosStore.obtenerUsuarios,
    reiniciarBusqueda: usuariosStore.reinciarFiltros,
});

onMounted(() => {
    Promise.allSettled([
        usuariosStore.obtenerUsuarios(),
        clientesStore.obtenerClientes(),
        sucursalesStore.obtenerSucursales(),
        areasStore.obtenerAreas(),
    ])
        .then(console.log)
        .catch(console.log);
});

onUnmounted(() => {
    usuariosStore.reinciarFiltros();
})
</script>